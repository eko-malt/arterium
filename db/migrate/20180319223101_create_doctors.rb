class CreateDoctors < ActiveRecord::Migration[5.1]
  def change
    create_table :doctors do |t|
      t.string :f_name
      t.string :s_name
      t.string :m_name
      t.string :spec
      t.string :city
      t.string :mediatorn
      t.string :effects
      t.string :indication
      t.string :your_indication

      t.timestamps
    end
  end
end
