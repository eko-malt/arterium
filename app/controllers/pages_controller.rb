class PagesController < ApplicationController
  def index; end

  def list
    @doctors = Doctor.all
  end

  def test
    @member = Doctor.first ||= Doctor.new
  end

  def results
    @doctors = Doctor.all
  end
end
