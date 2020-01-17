class GamesController < ApplicationController
  def create
    @game = Game.new(game_params)
  end

  private

  def game_params
    params.permit(:room_name, :word)
  end
end
