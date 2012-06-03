require 'sinatra/base'

class MemoryApp < Sinatra::Base
  set :public_folder, File.dirname(__FILE__)+"/static"
end
