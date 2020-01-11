class PagesController < ApplicationController
  def home

  end

  def keystroke
    key = params[:key]
    # @user_id =
    ActionCable.server.broadcast "KeystrokeChannel", {key: key}
  end
end
