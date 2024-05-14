# (c) CID Research LLC in partnership with Betavoid

import os
import sys
import numpy as np
from database import engine_standards as es

# Database
class Database():
    ACRONYM = None
    mechanical_property_dict = {
        "hardness": {
            "brinell":121,
            "knoop":140,
            "vickers":126,
            },
        "tensile_strength": {
            "ultimate":60900,
            "yield":50800,
            },
        "elongation_at_break": {
            "percentage":15
            },
      "modulus_of_elasticity": 29000,
      "bulk_modulus": 20300,
      "poissons_ratio": 0.25,
      "machinability": {
          "percentage": 65
          },
      "shear_modulus": 11600
    }

    ka_application_factor = np.array(
        [
          ["factor", "uniform", "light", "intermittent", "heavy"],
          ["uniform", 1.0, 1.2, 1.5, 1.8],
          ["light", 1.2, 1.3, 1.8, 2.1],
          ["medium", 2.0, 2.2, 2.4, 2.8],
        ]
    )
    ka_probs = np.random.rand(*ka_application_factor.shape)[1:, 1:]

    km_load_distribution_factor = np.array(
        [
          ["factor", "0.5in", "1in", "2in", "4in"],
          [0.001, 1.0, 1.0, 1.0, 1.5],
          [0.002, 1.0, 1.0, 1.5, 2.0],
          [0.004, 1.0, 1.5, 2.0, 2.5],
          [0.008, 1.5, 2.0, 2.5, 3.0],
        ]
    )
    km_probs = np.random.rand(*km_load_distribution_factor.shape)[1:,1:]

    kf_fatigue_life_factor = np.array(
        [
          ["factor", "unidirectional", "reversed"],
          [1e3, 1.8, 1.8],
          [1e4, 1.0, 1.0],
          [1e5, 0.5, 0.4],
          [1e6, 0.4, 0.3],
          [1e7, 0.3, 0.2],
        ]
    )
    kf_probs = np.random.rand(*kf_fatigue_life_factor.shape)[1:,1:]

    kw_wear_life_factor = np.array(
        [
          ["factor", "num_spine_revoluition"],
          [1e4, 4.0, ],
          [1e5, 2.8],
          [1e6, 2.0],
          [1e7, 1.4],
          [1e8, 1.0],
          [1e9, 0.7],
          [1e10, 0.5],
        ]
    )
    kw_probs = np.random.rand(*kw_wear_life_factor.shape)[1:,1:]

    pressure_angles = np.array([[5, 10, 20, 30, 40, 50, 60, 70, 80, 90],
                                [0, 10, 20, 30, 40, 50, 60, 70, 80, 90]])
    pa_probs = np.array([[0.11, 0.22, 0.33, 0.21, 0.18, 0.15, 0.12, 0.08, 0.02]])

    ka_range = [1.5, 1.8, 2.4]
    km_range = [1.0, 1.5, 2.0]
    kf_range = [0.5, 0.4, 0.3]
    kw_range = [2.8, 2.0, 1.4]
    fos_range = [2, 8]
    teeth_range = [12, 18, 36]
    pa_range = [0, 30, 100]

