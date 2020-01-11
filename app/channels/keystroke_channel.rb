class KeystrokeChannel < ApplicationCable::Channel
  def subscribed

    stream_from "KeystrokeChannel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
