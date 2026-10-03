"""Run with Python and lupa: python tests/db/test_item_overrides.py.

Exercises the actual embedded Lua item dispatcher with synthetic metadata.
No game data or database is required.
"""
from pathlib import Path
import re
import unittest
from lupa.lua51 import LuaRuntime

SOURCE = (Path(__file__).resolve().parents[2] / 'src/DB/DBManager.js').read_text()
RESET = re.search(r"lua\.doStringSync\('(tbl = \{\}[^']*)'\)", SOURCE).group(1)
START = SOURCE.index('function item_is_described(DESC)')
MAIN = SOURCE[START:SOURCE.index('`);', START)]

class ItemOverrideTests(unittest.TestCase):
    def setUp(self):
        self.lua = LuaRuntime()
        self.items = {}
        self.lua.globals().AddItem = lambda item, un, ur, name, resource, slots, view: self.items.update({item: (name, resource, slots, view)}) or 1
        for name in ['AddItemUnidentifiedDesc', 'AddItemIdentifiedDesc', 'AddItemEffectInfo', 'AddItemIsCostume', 'AddItemPackageID']:
            self.lua.globals()[name] = lambda *args: 1

    def load(self, tables):
        self.lua.execute(RESET)
        self.lua.execute(tables)
        self.lua.execute(MAIN)

    def test_later_file_can_restore_name_image_slots_and_weapon_view(self):
        self.load('tbl={[42]={identifiedDisplayName="Base",identifiedResourceName="missing",slotCount=0,ClassNum=0}}')
        self.load('tbl_override={[42]={identifiedDisplayName="Corrected",identifiedResourceName="available",slotCount=1,ClassNum=12}}')
        self.assertEqual(self.items[42], ('Corrected', 'available', 1, 12))

    def test_override_priority_within_one_file_is_preserved(self):
        self.load('tbl={[42]={identifiedDisplayName="Base"}}; tbl_override={[42]={identifiedDisplayName="Override",identifiedResourceName="preferred",slotCount=2,ClassNum=9}}')
        self.assertEqual(self.items[42], ('Override', 'preferred', 2, 9))

if __name__ == '__main__':
    unittest.main()
