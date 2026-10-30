"""Generuje optimalizované výřezy fotografií (AVIF + WebP) pro web Elektro Beránek."""
import os, json, sys
from PIL import Image, ImageOps
import pathlib
ROOT=pathlib.Path(__file__).resolve().parent.parent
U=str(ROOT/"_podklady"/"unsplash")+"/"
O=str(ROOT/"_podklady"/"puvodni-web")+"/"
OUT=str(ROOT/"assets"/"img")+"/"
# name: (source, aspect w/h, focal x, focal y (0-1), widths)
JOBS={
 "hero-strecha":   ("photo-1724041875334-0a6397111c7e", 4/5, .5, .55, [560,880,1280]),
 "hero-strecha-l": ("photo-1724041875334-0a6397111c7e", 16/10, .5, .42, [640,1024,1600]),
 "montaz-strecha": ("photo-1660330589257-813305a4a383", 3/2, .5, .5, [720,1100,1600]),
 "montaz-panel":   ("photo-1624397640148-949b1732bb0a", 4/3, .45, .5, [720,1100,1600]),
 "vrtani-panel":   ("photo-1668097613572-40b7c11c8727", 3/2, .6, .5, [720,1100,1600]),
 "dum-cerne-panely":("photo-1605980413988-9ff24c537935", 4/5, .5, .72, [560,880,1280]),
 "dum-panely":     ("photo-1655300256335-beef51a914fe", 16/10, .5, .5, [720,1100,1600]),
 "rozvadec-ruce":  ("photo-1758101755915-462eddc23f57", 4/3, .5, .5, [720,1100,1600]),
 "elektrikar-rozvadec":("photo-1660330590022-9f4ff56b63f6", 3/2, .5, .5, [720,1100,1600]),
 "jistice":        ("photo-1576446470246-499c738d1c8e", 3/2, .5, .5, [720,1100,1600]),
 "prilba-panel":   ("photo-1648135327756-b606e2eb8caa", 3/2, .45, .5, [720,1100,1600]),
 "panely-nebe":    ("photo-1658298775754-5839ffd434cc", 21/9, .5, .6, [960,1600,2200]),
 "panely-detail":  ("photo-1724041875467-3576f20170dc", 4/5, .5, .5, [560,880,1280]),
 "zapad-strecha":  ("photo-1613665813446-82a78c468a1d", 16/9, .5, .5, [960,1600,2200]),
 "multimetr":      ("photo-1553873002-785d775854c9", 4/3, .45, .5, [720,1100]),
}
def crop(im, ar, fx, fy):
    W,H=im.size
    if W/H>ar: cw,ch=int(H*ar),H
    else: cw,ch=W,int(W/ar)
    x=int(min(max(fx*W-cw/2,0),W-cw)); y=int(min(max(fy*H-ch/2,0),H-ch))
    return im.crop((x,y,x+cw,y+ch))
manifest={}
only=sys.argv[1:] 
for name,(src,ar,fx,fy,widths) in JOBS.items():
    if only and name not in only: continue
    im=ImageOps.exif_transpose(Image.open(U+src+".jpg")).convert("RGB")
    c=crop(im,ar,fx,fy)
    out=[]
    for w in widths:
        if w>c.width: w=c.width
        h=round(w/ar)
        r=c.resize((w,h),Image.LANCZOS)
        r.save(f"{OUT}{name}-{w}.avif",quality=52,speed=4)
        r.save(f"{OUT}{name}-{w}.webp",quality=74,method=6)
        out.append([w,h])
    manifest[name]={"src":src,"sizes":out,"ar":ar}
    print(name,out)
# produktové fotky (průhledné PNG) -> WebP s alfa kanálem, oříznuté okraje
PROD={"dyness-tower":"Dyness.png","goodwe-et":"elektrarny_goodwe.png","solax-x3":"elektrarny_solax.png"}
for name,f in PROD.items():
    if only and name not in only: continue
    im=Image.open(O+f).convert("RGBA")
    bbox=im.getchannel("A").point(lambda a:255 if a>8 else 0).getbbox()
    im=im.crop(bbox)
    im.save(f"{OUT}{name}.webp",quality=82,method=6)
    manifest[name]={"sizes":[list(im.size)]}
    print(name,im.size)
mf=str(ROOT/"_vyvoj"/"images.json")
old=json.load(open(mf)) if os.path.exists(mf) else {}
old.update(manifest); json.dump(old,open(mf,"w"),indent=1)
