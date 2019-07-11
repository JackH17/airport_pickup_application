class BusinessPickupsController < ApplicationController

  # before_action :set_pickup, only: [:show, :destroy]


  def index
      # byebug
     # @my_Pickups = BusinessPickup.find_by(driver_id: params[:driver_id])
     @pickups = BusinessPickup.all
     render json: @pickups, except:[:created_at, :updated_at], include: [:airport]
     # render json: @my_pickups,
  end

  def create
      airport = Airport.find_by(code: params[:code])
      # byebug
      if airport
        hash = pickup_params.to_hash
        hash[:airport_id] = airport.id
        @business_pickup = BusinessPickup.create!(hash)
        render json: @business_pickup
      else
        render json: { error: "Airport not found. Please enter a different flight number." }, status: 404
      end
  end

  def show
      render json: @business_pickup
  end

  def destroy
      @landing = BusinessPickup.find(params[:id])
      @landing.destroy
      render json: {message: "Done"}
  end



  private

  def pickup_params
      params.require(:business_pickup).permit(:passenger_name, :flight_number, :driver_id, :code, :status, :time, :terminal)
  end

  def set_pickup
      @business_pickup = Pickup.find(params[:id])
  end
end
