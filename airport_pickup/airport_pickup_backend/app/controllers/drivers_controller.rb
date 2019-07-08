class DriversController < ApplicationController

    before_action :set_driver, only: [:show, :destroy]


    def index 
       @driver = Driver.all
       render json: @driver, except: [:created_at, :updated_at]
    end 

    def create 
        @driver = Driver.create!(driver_params)
        render json: @driver
    end 

    def show 
        render json: @driver
    end 

    def destroy 
        @driver.destroy
    end 

    private 

    def driver_params
        params.require(:driver).permit(:username)
    end 

    def set_driver 
        @driver = Driver.find(params[:id])
    end 
end
