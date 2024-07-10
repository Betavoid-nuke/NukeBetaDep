# Input variable processed from prompt
prompt = "Design a gear that can fit in volume – 200mm, 200mm, 10mmm, can transmit 10,000Nm torque, is made of stainless steel, and manufactured under $100 per piece, for jet engine."

# Some processing to map from to dict
input = dict(
    volume = [200, 200, 10],
    torque = 200,
    material = "stainless_steel",
    budget = 100,
    price_unit = '$',
    product = 'gearbox',
    of = "jet engine",
)
