class AirportsController < ApplicationController

    before_action :set_airport, only: [:show, :destroy]


    def index 
       @airport = Airport.all
       render json: @airport, except: [:created_at, :updated_at]
    end 

    def create 
        @airport = Airport.create!(airport_params)
        render json: @airport
    end 

    def show 
        render json: @airport
    end 

    def destroy 
        @airport.destroy
    end 

    private 

    def airport_params
        params.require(:airport).permit(:name, :code, :status)
    end 

    def set_airport 
        @airport = Airport.find(params[:id])
    end 

end
