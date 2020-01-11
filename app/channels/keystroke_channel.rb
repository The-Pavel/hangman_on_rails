class KeystrokeChannel < ApplicationCable::Channel
  def subscribed

    stream_from "KeystrokeChannel_#{params[:channel_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
