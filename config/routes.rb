Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'pages#home'
  get '/keystroke', to: 'pages#keystroke', as: 'keystroke'
  resources :games, only: :create

  mount ActionCable.server => '/cable'
end
