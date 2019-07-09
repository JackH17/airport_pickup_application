Rails.application.routes.draw do
  get 'sessions/new'
  get 'sessions/create'
  get 'sessions/destroy'
  resources :pickups
  resources :drivers
  resources :airports
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
