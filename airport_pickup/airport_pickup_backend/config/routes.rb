Rails.application.routes.draw do
  resources :business_pickups
  resources :pickups
  resources :drivers
  resources :airports
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
