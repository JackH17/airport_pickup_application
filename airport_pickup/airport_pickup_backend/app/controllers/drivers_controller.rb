class DriversController < ApplicationController

    # before_action :set_driver, only: [:show, :destroy]


    def index
       @driver = Driver.all
       render json: @driver, except: [:created_at, :updated_at], include: [:pickups]
    end

    def create
        @driver = Driver.create!(driver_params)
        render json: @driver, except: [:created_at, :updated_at]
    end

    def show
        @driver = Driver.find(params[:id])
        render json: @driver, include: [:pickups]
    end

    def destroy
        @driver.destroy
    end

    private

    def driver_params
        params.require(:driver).permit(:username, :password, :firstname, :lastname)
        # params.require(:driver).permit(:username)

    end

    def set_driver
        @driver = Driver.find(params[:id])
    end
end
