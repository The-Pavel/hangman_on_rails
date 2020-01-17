class PagesController < ApplicationController
  def home
    @user_id = params[:user_id]
    @channel_id = params[:channel_id]
    @word = Word.first
    @def_index = 0
    @hint_index = 0
    # RANDOMIZING WORD, GETTING DEFINITIONS AND EXAMPLES, SAVING TO DB - disabled for now to avoid getting blocked
    # keyword = Faker::Hipster.word
    # unless Word.find_by_word(keyword)
      # @urban_dict_hash = JSON.parse(RestClient.get("http://api.urbandictionary.com/v0/define?term=#{keyword}"))
      # @definitions = @urban_dict_hash['list'].map{|i| i['definition']}
      # @examples = @urban_dict_hash['list'].map{|i| i['example']}
    #   w = Word.new(word: keyword)
    #   w.definitions = @definitions
    #   w.examples = @examples
    #   w.difficulty = keyword.length
    #   w.save
    #   @word = w
    #   @def_index = 0
    #   @hint_index = 0
    # else
    #   @word = Word.find_by_word(keyword)
    #   @def_index = 0
    #   @hint_index = 0
    # end
  end

  def keystroke
    key = params[:key]
    user_id = params[:user_id]
    channel_id = params[:channel_id]
    word = Word.find(params[:word_id].to_i)
    matches = word.word.enum_for(:scan, /#{key.downcase}/).map { Regexp.last_match.offset(0).first }
    # p ActionCable.server.connections.first
    ActionCable.server.broadcast "KeystrokeChannel_#{params[:channel_id]}", {match: matches != [], pos: matches, user_id: user_id, word: word.word}
  end
end
