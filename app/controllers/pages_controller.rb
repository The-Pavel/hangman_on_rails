class PagesController < ApplicationController
  def home
    @user_id = params[:user_id]
    @channel_id = params[:channel_id]
  end

  def keystroke
    key = params[:key]
    user_id = params[:user_id]
    ActionCable.server.broadcast "KeystrokeChannel_#{params[:channel_id]}", {key: key}
  end
end
