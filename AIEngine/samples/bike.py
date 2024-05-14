# Input variable processed from prompt
prompt = "Create a stainless steel gear that fits in a 100mm x 100mm x 15mm volume, can handle 2400 Nm of torque, and costs less than $50 per unit, for a bicycle gear box."
    
# Some processing to map from to dict
input = dict(
    volume = [100, 100, 15],
    torque = 2400,
    torque_unit = "Nm",
    material = "stainless_steel",
    budget = 50,
    price_unit = '$',
    product = 'gearbox',
    of = "bike",
    volume_unit = "mm",
    code = "james_quote.py",
)
