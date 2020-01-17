class KeystrokeChannel < ApplicationCable::Channel
  def subscribed
    p 'hello there general kenobi'.upcase
    p connections_info
    stream_from "KeystrokeChannel_#{params[:channel_id]}"
  end

  def receive(payload)
    p 'PAYLOAD INCOMING'
    p payload
    # ActionCable.server.broadcast('messages', {message: message.content, chatroom_id: message.chatroom_id})
  end

  def unsubscribed
    p 'UNSUBSCRIBE IS HIT'
    stop_all_streams
    # Any cleanup needed when channel is unsubscribed
  end
end
