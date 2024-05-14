from config.struct import AttrDict

class Input:
    def search():
        return NotImplementedError
    
    def retrieval():
        return LookupError
    
    def get_optimal_template(*args):        
        # DL Retrieval system
        return AttrDict(
            achieved = False,
            product = 'gearbox',
            of = 'bike',
            material = 'stainless_steel',
            volume = [100,100,15],
            torque = 120,
            budget = 50,
            nT  = 14,
            d   = 1,
            pa  = 30,
            cd  = 3.0,
            ms  = None,
            ka  = None,
            kf  = None,
            km  = None,
            kw  = None,
            dp  = None,
            pd  = None,
            ss  = None,
            fos = None,
            volume_unit = 'mm',
            torque_unit = 'Nm',
            price_unit = '$',
            los = 0.0,
            save = None,
            D = None,
            cm = None,
            lm = None,
            cc = None,
            )