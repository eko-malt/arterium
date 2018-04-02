class AddOtherToDoctor < ActiveRecord::Migration[5.1]
  def change
    add_column :doctors, :spec_other, :string
    add_column :doctors, :indication_other, :string
  end
end
