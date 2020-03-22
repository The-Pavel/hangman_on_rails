class KeystrokeChannel < ApplicationCable::Channel
  def subscribed
    p 'hello there general kenobi'.upcase
    p connections_info
    channel_players = connections_info.select{|c|
      c[:subscriptions_identifiers][0]['channel_id'] == params[:channel_id] unless c[:subscriptions_identifiers].empty?}
    channel_players.map!{|pl| pl[:subscriptions_identifiers][0]['user_id']}
    # p channel_players
    stream_from "KeystrokeChannel_#{params[:channel_id]}"
    ActionCable.server.broadcast "KeystrokeChannel_#{params[:channel_id]}", {new_game: true, players: channel_players}
  end

  def receive(payload)
    p 'PAYLOAD INCOMING'
    p payload
    ActionCable.server.broadcast "KeystrokeChannel_#{payload['channel_id']}", {new_player: true, player_id: "#{payload['user_id']}"}
    # ActionCable.server.broadcast('messages', {message: message.content, chatroom_id: message.chatroom_id})
  end

  def unsubscribed
    p 'UNSUBSCRIBE IS HIT'
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end
end
