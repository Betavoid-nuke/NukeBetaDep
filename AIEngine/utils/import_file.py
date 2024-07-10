import importlib.util

def get(file_url):
    # Load the module
    spec = importlib.util.spec_from_file_location("module_name", file_url)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.input
