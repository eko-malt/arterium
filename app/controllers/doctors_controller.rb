class DoctorsController < ApplicationController
  before_action :set_doctor, only: %i[show edit update destroy]

  def new
    @doctor = Doctor.new
  end

  def create
    @doctor = Doctor.new(doctor_params)
    if @doctor.save
      redirect_to doctor_path(@doctor)
    else
      render :new
    end
  end

  def show; end

  def edit; end

  def update
    render :edit unless @doctor.update(doctor_params)
    redirect_to doctor_path(@doctor)
  end

  def destroy
    @doctor.destroy
    redirect_to new_doctor_path
  end

  private

  def doctor_params
    params.require(:doctor).permit!
  end

  def set_doctor
    @doctor = Doctor.find(params[:id])
  end
end