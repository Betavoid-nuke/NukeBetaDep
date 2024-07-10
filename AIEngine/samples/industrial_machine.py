# Input variable processed from prompt
prompt = "Design a gear that can fit in volume – 150mm, 150mm, 20mmm, can transmit 4,000Nm torque, is made of stainless steel, and manufactured under $300 per piece, for industrial machine."

# Some processing to map from to dict
input = dict(
    volume = [150, 150, 20],
    torque = 4000,
    material = "stainless_steel",
    budget = 300,
    price_unit = '$',
    product = 'gearbox',
    of = "industrial machine",
)
