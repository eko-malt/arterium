require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module Registration
  class Application < Rails::Application
    config.load_defaults 5.1
    config.i18n.default_locale = :uk
    config.time_zone = 'Kyiv'
    config.active_record.default_timezone = :local
  end
end