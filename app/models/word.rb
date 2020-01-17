class Word < ApplicationRecord
  validates :word, uniqueness: true
end
