# (c) CID Research LLC in partnership with Betavoid

# Data Structure

from config.struct import AttrDict


items = dict(
        achieved = 'Achieved',
        product = 'Product',
        of = 'Designed for a',
        material = 'Material',
        volume = 'Volume (In)',
        torque = 'Torque (Lb-In)',
        budget = 'Budget ($)',
        nT  = 'Number of Teeth',
        pa  = 'Pressure Angle',
        cd  = 'Center Diameter',
        ms  = 'Max. Allowable Stress (ms)',
        ka  = 'Application Factor (ka)',
        kf  = 'Fatique Life Factor (kf)',
        km  = 'Load Distribution Factor (km)',
        kw  = 'Wear Life Factor (kw)',
        dp  = 'Diametric Pitch (pd)',
        pd  = 'Pitch Diameter (D)',
        ss  = 'Shear Stress (Ss)',
        fos = 'Force of Safety (FOS)',
        los = 'Length of Splines',
        MD0 = 'Major Diameter, Internal',
        MD1 = 'Major Diameter, External',
        md0 = 'Minor Diameter, Internal',
        md1 = 'Minor Diameter, External (thru + pitch)',
        md2 = 'Minor Diameter, External (pitch + fine)',
        Add = "Addendum",
        Ddd = "Dedendum",
        Ddds = "Dedendum (Shaved or Ground Teeth)",
        wkd =  "Working Depth",
        whd = "Whole Depth (Preffered)",
        whds = "Whole Depth (Shaved or Ground Teeth)",
        clr = "Clearance",
        clrs = "Clearance (Shaved or Ground Teeth)",
        flr = "Filet Radius",
        psd = "Piutside Diameter",
        rtd = "Root Diameter (Preffered)",
        rtds = "Root Diameter (Shaved or Ground Teeth)",
        ctb =  "Circle Thickness (Basic)",
        d   = 'Diameter',
        code = "Code",
        cc = "CC",
        cm = "CircleMultiplier",
        lm = "LineMultiplier",
        D = "Depth",
    )

converter = dict()

ACRONYM = AttrDict(items)