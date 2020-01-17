class KeystrokeChannel < ApplicationCable::Channel
  def subscribed
    p 'hello there general kenobi'
    p connections_info
    stream_from "KeystrokeChannel_#{params[:channel_id]}"
  end

  def receive(payload)
    p 'payload incoming'
    p payload
    # ActionCable.server.broadcast('messages', {message: message.content, chatroom_id: message.chatroom_id})
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
