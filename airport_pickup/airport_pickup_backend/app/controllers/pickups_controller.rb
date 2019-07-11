class PickupsController < ApplicationController

    before_action :set_pickup, only: [:show, :destroy]


    def index
       @pickup = Pickup.all
       render json: @pickup, except: [:created_at, :updated_at]
    end

    def create
        # @airport = Airport.airport_name(params[:airport_id])
        Pickup.create!(pickup_params)
        render json: @pickup
    end

    def show
        render json: @pickup
    end

    def destroy
        @pickup.destroy
    end



    private

    def pickup_params
        params.require(:pickup).permit(:passenger_name, :flight_number, :driver_id, :airport_id)
    end

    def set_pickup
        @pickup = Pickup.find(params[:id])
    end
end
