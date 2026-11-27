import{A as e,B as t,C as n,D as r,E as i,F as a,G as o,H as s,I as c,K as l,L as u,M as d,N as f,O as p,P as m,R as h,S as g,T as _,U as v,V as y,W as b,_ as x,a as S,b as C,c as w,d as ee,f as T,g as E,h as D,i as O,j as k,k as A,l as j,m as M,n as N,o as P,p as F,r as I,s as L,t as R,u as te,v as z,w as ne,x as B,y as V,z as H}from"./three-nZcM9jM4.js";import{n as U,r as W,t as re}from"./motion-CgUJxjNR.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function ie(e=256,t=256){let n=document.createElement(`canvas`);n.width=e,n.height=t;let r=n.getContext(`2d`);r.fillStyle=`#808080`,r.fillRect(0,0,e,t);for(let n=0;n<t;n++){let t=112+Math.floor(Math.random()*34);if(r.fillStyle=`rgb(${t},${t},${t})`,r.fillRect(0,n,e,1),Math.random()>.65){let t=148+Math.floor(Math.random()*28),i=Math.floor(Math.random()*e),a=28+Math.floor(Math.random()*90);r.fillStyle=`rgba(${t},${t},${t},0.35)`,r.fillRect(i,n,a,1)}}let i=new j(n);return i.wrapS=h,i.wrapT=h,i.repeat.set(3,3),i.colorSpace=``,i}function ae(){let e=document.createElement(`canvas`);e.width=256,e.height=256;let t=e.getContext(`2d`);t.fillStyle=`#14110c`,t.fillRect(0,0,256,256);for(let e=0;e<8;e++)for(let n=0;n<12;n++)(e*7+n*13)%5!=0&&(t.fillStyle=(e+n)%3==0?`rgba(255, 214, 146, 0.85)`:`rgba(236, 178, 96, 0.62)`,t.fillRect(n*21.333333333333332+3,e*32+5,15.333333333333332,22));let n=new j(e);return n.wrapS=h,n.wrapT=h,n.colorSpace=H,n}function oe(t=!1){let n=ie(),r=ae();return{titaniumDark:new e({color:new T(1580068),metalness:.9,roughness:.2,clearcoat:.42,clearcoatRoughness:.16,bumpMap:n,bumpScale:.003,envMapIntensity:1.9}),titaniumGraphite:new e({color:new T(2435894),metalness:.88,roughness:.24,clearcoat:.3,clearcoatRoughness:.2,bumpMap:n,bumpScale:.004,envMapIntensity:1.65}),brushedAluminum:new e({color:new T(7239815),metalness:.92,roughness:.24,clearcoat:.35,clearcoatRoughness:.18,bumpMap:n,bumpScale:.005,envMapIntensity:1.65}),curtainGlass:new e({color:new T(5401474),metalness:.08,roughness:.08,transmission:t?.74:.85,ior:1.52,thickness:.42,attenuationColor:new T(3826820),attenuationDistance:3.5,clearcoat:1,clearcoatRoughness:.05,transparent:!0,opacity:.92,envMapIntensity:1.9,side:2}),sapphireGlass:new e({color:new T(8957384),metalness:.06,roughness:.04,transmission:t?.75:.86,ior:1.76,thickness:.32,clearcoat:1,clearcoatRoughness:.04,transparent:!0,opacity:.9,envMapIntensity:2.2}),concreteBasalt:new k({color:new T(1711654),metalness:.16,roughness:.78,envMapIntensity:.8}),structuralSteel:new k({color:new T(4937059),metalness:.86,roughness:.3,envMapIntensity:1.45}),machinedCopper:new e({color:new T(0xc97b49),metalness:.94,roughness:.2,clearcoat:.35,clearcoatRoughness:.16,bumpMap:n,bumpScale:.003,envMapIntensity:1.85}),pcbSubstrate:new k({color:new T(726044),metalness:.38,roughness:.38,envMapIntensity:1.15}),amberEmissive:new k({color:new T(0xf4b860),emissive:new T(0xe08d2a),emissiveIntensity:1.55,roughness:.2,metalness:.25,toneMapped:!1}),cyanEmissive:new k({color:new T(8246268),emissive:new T(2282478),emissiveIntensity:1.65,roughness:.2,metalness:.2,toneMapped:!1}),retailInteriorGlow:new k({color:new T(2169104),emissive:new T(0xdf943c),emissiveMap:r,emissiveIntensity:1.35,roughness:.38,metalness:.2}),cadEdgeLine:new _({color:new T(4674921),transparent:!0,opacity:.14}),bimWireframeLine:new _({color:new T(3718648),transparent:!0,opacity:0}),highlightAmber:new k({color:new T(0xfad18c),emissive:new T(0xf59e0b),emissiveIntensity:1.75,roughness:.2,metalness:.5}),ambientWireLine:new _({color:new T(3718648),transparent:!0,opacity:.26}),ambientGoldLine:new _({color:new T(0xd49b4b),transparent:!0,opacity:.34}),textures:{brushedMap:n,interiorGlowMap:r}}}function se(e){let n=new S(e);n.compileEquirectangularShader();let r=new t;r.background=new T(395018);let i=new A({color:new T(5.5,5.8,6.4)}),a=new p(new c(18,4.5),i);a.position.set(0,12,0),a.rotation.x=Math.PI/2,r.add(a);let o=new A({color:new T(3.4,3.8,4.4)}),s=new p(new c(14,1.8),o);s.position.set(0,10,-8),s.rotation.x=Math.PI/3,r.add(s);let l=new A({color:new T(1.4,3.6,6.2)}),u=new p(new c(12,9),l);u.position.set(-14,4,-4),u.lookAt(0,0,0),r.add(u);let d=new A({color:new T(6,3.6,1.4)}),f=new p(new c(11,8),d);f.position.set(14,3.5,5),f.lookAt(0,0,0),r.add(f);let m=new A({color:new T(1.8,2,2.4)}),h=new p(new c(24,1.4),m);h.position.set(0,1.5,14),h.lookAt(0,1.5,0),r.add(h);let g=new A({color:new T(.28,.34,.42)}),_=new p(new te(14,32),g);_.position.set(0,-10,0),_.rotation.x=-Math.PI/2,r.add(_);let v=n.fromScene(r,.035);return n.dispose(),v.texture}function ce(e){let t=new B;t.name=`StudioLights`;let r=new n(0xcbd8f0,724500,.45);t.add(r);let i=new D(0xf3f7ff,2.4);i.position.set(5.5,14,7.5),i.castShadow=!0,i.shadow.mapSize.width=1024,i.shadow.mapSize.height=1024,i.shadow.camera.near=2,i.shadow.camera.far=32,i.shadow.camera.left=-10,i.shadow.camera.right=10,i.shadow.camera.top=10,i.shadow.camera.bottom=-10,i.shadow.bias=-5e-4,t.add(i);let a=new D(5155071,2.8);a.position.set(-10,6.5,-7),t.add(a);let o=new D(0xffa94d,2.45);o.position.set(10,4.5,5.5),t.add(o);let s=new u(0xffa742,3.2,12,1.6);s.position.set(.6,-1.2,2.2),t.add(s);let c=new u(2282478,1.4,14,1.8);return c.position.set(-2.5,-2.5,-1.5),t.add(c),e.add(t),{group:t,hemiLight:r,keyLight:i,coolRimLight:a,warmRimLight:o,retailPointLight:s,underCyanLight:c}}function le(){let e=new B;e.name=`StudioDatumFloor`,e.position.y=-2.45;let t=new y({color:0,opacity:.65}),n=new p(new te(18,64),t);n.rotation.x=-Math.PI/2,n.receiveShadow=!0,e.add(n);let r=new k({color:724242,metalness:.72,roughness:.48,envMapIntensity:.75}),a=new p(new M(3.65,3.8,.04,72),r);a.position.y=-.025,a.receiveShadow=!0,e.add(a);let s=9.5,c=[],l=[],u=new T(2634564),d=new T(460810),f=(e,t,n,r)=>{let i=Math.hypot(e,t),a=Math.hypot(n,r),o=Math.max(0,1-i/8.8),s=Math.max(0,1-a/8.8);if(o<=.01&&s<=.01)return;let f=d.clone().lerp(u,o*o*o*.8),p=d.clone().lerp(u,s*s*s*.8);c.push(e,.008,t,n,.008,r),l.push(f.r,f.g,f.b,p.r,p.g,p.b)};for(let e=-10;e<=10;e++){let t=e*.95;for(let e=0;e<16;e++){let n=-9.5+e/16*(s*2),r=-9.5+(e+1)/16*(s*2);f(t,n,t,r),f(n,t,r,t)}}let m=new w;m.setAttribute(`position`,new V(c,3)),m.setAttribute(`color`,new V(l,3));let h=new _({vertexColors:!0,transparent:!0,opacity:.72}),g=new i(m,h);e.add(g);let v=new _({color:4674921,transparent:!0,opacity:.35}),b=new _({color:0xd49b4b,transparent:!0,opacity:.42}),x=(e,t,n)=>{let r=[];for(let n=0;n<=t;n++){let i=n/t*Math.PI*2;r.push(new o(Math.cos(i)*e,.014,Math.sin(i)*e))}let i=new w().setFromPoints(r);return new ne(i,n)};e.add(x(3.55,96,b)),e.add(x(6.2,96,v));let S=[];for(let e=0;e<36;e++){let t=e/36*Math.PI*2,n=e%9==0,r=n?3.35:3.47,i=n?3.78:3.63;S.push(Math.cos(t)*r,.015,Math.sin(t)*r,Math.cos(t)*i,.015,Math.sin(t)*i)}let C=new w;return C.setAttribute(`position`,new V(S,3)),e.add(new i(C,v)),{group:e,gridMat:h,ringMatInner:b,ringMatOuter:v,shadowFloorMat:t}}function G(e,t,n,{radius:r=.04,bevelSize:i=.025,bevelThickness:a=.025,bevelSegments:o=2}={}){let c=Math.min(r,e*.4,n*.4),l=Math.max(.02,e-i*2),u=Math.max(.02,n-i*2),d=l/2,f=u/2,p=new s;p.moveTo(-d+c,-f),p.lineTo(d-c,-f),p.quadraticCurveTo(d,-f,d,-f+c),p.lineTo(d,f-c),p.quadraticCurveTo(d,f,d-c,f),p.lineTo(-d+c,f),p.quadraticCurveTo(-d,f,-d,f-c),p.lineTo(-d,-f+c),p.quadraticCurveTo(-d,-f,-d+c,-f);let m=Math.max(.01,t-a*2),h=new z(p,{depth:m,bevelEnabled:!0,bevelThickness:a,bevelSize:i,bevelSegments:o,curveSegments:5});return h.rotateX(-Math.PI/2),h.center(),h.computeVertexNormals(),h}function K(e,t,n,{radius:r=.14,bevelSize:i=.025,bevelThickness:a=.02,bevelSegments:o=2}={}){let c=Math.min(r,e*.35,t*.35),l=Math.max(.04,e-i*2),u=Math.max(.04,t-i*2),d=l/2,f=u/2,p=new s;p.moveTo(-d+c,-f),p.lineTo(d-c,-f),p.quadraticCurveTo(d,-f,d,-f+c),p.lineTo(d,f-c),p.quadraticCurveTo(d,f,d-c,f),p.lineTo(-d+c,f),p.quadraticCurveTo(-d,f,-d,f-c),p.lineTo(-d,-f+c),p.quadraticCurveTo(-d,-f,-d+c,-f);let m=Math.max(.008,n-a*2),h=new z(p,{depth:m,bevelEnabled:!0,bevelThickness:a,bevelSize:i,bevelSegments:o,curveSegments:6});return h.center(),h.computeVertexNormals(),h}function q(e,t,n,r,{radius:i=.14,bevelSize:a=.02,bevelThickness:o=.02,alignY:c=!1}={}){let l=e/2,u=t/2,d=Math.min(i,l*.4,u*.4),f=new s;f.moveTo(-l+d,-u),f.lineTo(l-d,-u),f.quadraticCurveTo(l,-u,l,-u+d),f.lineTo(l,u-d),f.quadraticCurveTo(l,u,l-d,u),f.lineTo(-l+d,u),f.quadraticCurveTo(-l,u,-l,u-d),f.lineTo(-l,-u+d),f.quadraticCurveTo(-l,-u,-l+d,-u);let p=Math.max(.05,l-r),h=Math.max(.05,u-r),g=Math.max(.02,d-r*.5),_=new m;_.moveTo(-p+g,-h),_.lineTo(p-g,-h),_.quadraticCurveTo(p,-h,p,-h+g),_.lineTo(p,h-g),_.quadraticCurveTo(p,h,p-g,h),_.lineTo(-p+g,h),_.quadraticCurveTo(-p,h,-p,h-g),_.lineTo(-p,-h+g),_.quadraticCurveTo(-p,-h,-p+g,-h),f.holes.push(_);let v=new z(f,{depth:Math.max(.01,n-o*2),bevelEnabled:!0,bevelThickness:o,bevelSize:a,bevelSegments:2,curveSegments:6});return c&&v.rotateX(-Math.PI/2),v.center(),v.computeVertexNormals(),v}function J(e,t,n,{segments:r=48,bevelSize:i=.014,bevelThickness:a=.014}={}){let o=new s;o.absarc(0,0,e,0,Math.PI*2,!1);let c=new m;c.absarc(0,0,Math.max(.02,t),0,Math.PI*2,!0),o.holes.push(c);let l=new z(o,{depth:Math.max(.01,n-a*2),bevelEnabled:!0,bevelThickness:a,bevelSize:i,bevelSegments:2,curveSegments:r});return l.center(),l.computeVertexNormals(),l}function Y(e,t,n,{castShadow:r=!0,receiveShadow:a=!0}={}){let o=new B,s=new p(e,t);s.castShadow=r,s.receiveShadow=a,s.userData.isSolidArch=!0,o.add(s);let c=new E(e,26),l=new i(c,n.cadEdgeLine);l.userData.isCadEdge=!0,o.add(l);let u=new i(c,n.bimWireframeLine);return u.userData.isBimEdge=!0,o.add(u),o}function X(e,t,n,r,a){let o=new B,s=new p(new L(e-.04,t-.04,.032),a.curtainGlass);s.userData.isGlass=!0,o.add(s);let c=new L(.032,t,.075);for(let t=0;t<=n;t++){let r=-e/2+t/n*e,i=new p(c,a.brushedAluminum);i.position.set(r,0,.015),o.add(i)}let l=new L(e,.036,.06);for(let e=0;e<=r;e++){let n=-t/2+e/r*t,i=new p(l,a.titaniumGraphite);i.position.set(0,n,.01),o.add(i)}let u=new E(new L(e,t,.07)),d=new i(u,a.bimWireframeLine);return o.add(d),o}function ue(e,t,n,r,i,a,o){let s=new B,c=o.structuralSteel,l=.055,u=new L(l,t,l);for(let t=0;t<=r;t++){let i=-e/2+t/r*e;for(let e of[-n/2,n/2]){let t=new p(u,c);t.position.set(i,0,e),s.add(t)}}for(let t=1;t<i;t++){let r=-n/2+t/i*n;for(let t of[-e/2,e/2]){let e=new p(u,c);e.position.set(t,0,r),s.add(e)}}let d=new L(e,.05,.05),f=new L(.05,.05,n);for(let r=0;r<=a;r++){let i=-t/2+r/a*t;for(let e of[-n/2,n/2]){let t=new p(d,c);t.position.set(0,i,e),s.add(t)}for(let t of[-e/2,e/2]){let e=new p(f,c);e.position.set(t,i,0),s.add(e)}}let m=e/r,h=t/a,g=Math.hypot(m,h),_=Math.atan2(h,m),v=new L(g,.026,.026);for(let i=0;i<a;i++){let a=-t/2+(i+.5)*h;for(let t=0;t<r;t++){let r=-e/2+(t+.5)*m,c=(i+t)%2==0?1:-1;for(let e of[-n/2,n/2]){let t=new p(v,o.brushedAluminum);t.position.set(r,a,e),t.rotation.z=c*_,s.add(t)}}}return s}function de(e){let t=new B;t.name=`Zone1_ArchitecturalMassing`;let n=[],i=(e,r,i,a=0)=>(e.name=r,e.position.set(i[0],i[1],i[2]),e.userData.restPos=new o(...i),e.userData.riseDelay=a,e.userData.riseDepth=2.6+a*1.4,t.add(e),n.push(e),e);i(Y(G(5.6,.24,4.4,{radius:.12,bevelSize:.03,bevelThickness:.03}),e.concreteBasalt,e),`01_SubterraneanPlinth`,[0,-2.3,0],0),i(Y(G(5.1,.22,3.9,{radius:.1,bevelSize:.025,bevelThickness:.025}),e.titaniumDark,e),`02_PodiumPlazaTerrace`,[0,-2.06,0],.04);let a=new B,s=new p(G(4.35,.72,3.15,{radius:.06,bevelSize:.02,bevelThickness:.02}),e.retailInteriorGlow);a.add(s);let c=new p(q(4.48,3.28,.055,.06,{radius:.08,alignY:!0,bevelSize:.008,bevelThickness:.008}),e.amberEmissive);c.position.y=.34,a.add(c),i(a,`03_RetailAtriumGlow`,[0,-1.58,0],.08);let l=new B,u=X(4.55,.76,9,1,e);u.position.z=1.68;let d=X(4.55,.76,9,1,e);d.position.z=-1.68;let f=X(3.36,.76,6,1,e);f.rotation.y=Math.PI/2,f.position.x=2.275;let m=X(3.36,.76,6,1,e);m.rotation.y=Math.PI/2,m.position.x=-2.275,l.add(u,d,f,m),i(l,`04_RetailGlazingWrap`,[0,-1.58,0],.12),i(Y(G(4.85,.18,3.68,{radius:.08,bevelSize:.025,bevelThickness:.02}),e.titaniumDark,e),`05_PodiumCanopyFascia`,[0,-1.12,0],.16);let h=new B;h.add(Y(G(1.55,1.85,2.2,{radius:.06,bevelSize:.025,bevelThickness:.025}),e.titaniumGraphite,e));let g=new p(new L(1.42,1.56,2.08),e.retailInteriorGlow);h.add(g),i(h,`06_WestHospitalityWing`,[-1.42,-.1,-.12],.2);let _=new B,v=X(1.58,1.8,4,5,e);v.position.z=1.13;let y=X(2.22,1.8,5,5,e);y.rotation.y=Math.PI/2,y.position.x=-.8,_.add(v,y),i(_,`07_WestWingCurtainWall`,[-1.42,-.1,-.12],.24);let b=new B;b.add(Y(G(1.5,.2,1.45,{radius:.05,bevelSize:.02,bevelThickness:.02}),e.brushedAluminum,e));let x=new p(new L(1.46,.035,1.48),e.cyanEmissive);x.position.y=-.09,b.add(x),i(b,`08_SkyBridgeTerrace`,[-.62,.72,.2],.28),i(Y(G(.92,4.35,.92,{radius:.04,bevelSize:.02,bevelThickness:.02}),e.concreteBasalt,e),`09_MainTowerCore`,[.82,1.12,-.05],.32);let S=new B;for(let t=0;t<6;t++){let n=Y(G(2.26,.12,2.26,{radius:.06,bevelSize:.018,bevelThickness:.016}),e.titaniumDark,e);n.position.y=-.82+t*.34,S.add(n)}let C=new p(new L(1.94,1.85,1.94),e.retailInteriorGlow);C.position.y=.05,S.add(C),i(S,`10_LowerOfficeStack`,[.82,-.04,-.05],.36);let w=new B,ee=X(2.3,4.18,6,11,e);ee.position.z=1.15;let T=X(2.3,4.18,6,11,e);T.rotation.y=Math.PI/2,T.position.x=1.15,w.add(ee,T),i(w,`11_TowerCurtainWallFrontEast`,[.82,1.06,-.05],.4);let E=new B,D=X(2.3,4.18,6,11,e);D.position.z=-1.15;let O=X(2.3,4.18,6,11,e);O.rotation.y=Math.PI/2,O.position.x=-1.15,E.add(D,O),i(E,`12_TowerCurtainWallRearWest`,[.82,1.06,-.05],.44);let k=new B;k.add(Y(G(2.74,.17,2.74,{radius:.08,bevelSize:.022,bevelThickness:.02}),e.titaniumDark,e));let A=new p(q(2.78,2.78,.05,.05,{radius:.09,alignY:!0,bevelSize:.008,bevelThickness:.008}),e.amberEmissive);A.position.y=-.02,k.add(A),i(k,`13_AmenitySkyDeckL12`,[.78,1.18,-.05],.48);let j=new B;for(let t=0;t<6;t++){let n=Y(G(2.14,.11,2.14,{radius:.06,bevelSize:.016,bevelThickness:.014}),e.titaniumDark,e);n.position.y=-.82+t*.34,j.add(n)}let M=new p(new L(1.86,1.82,1.86),e.retailInteriorGlow);M.position.y=.05,j.add(M),i(j,`14_UpperExecutiveStack`,[.82,2.22,-.05],.52);let N=new B,P=G(.16,4.5,.24,{radius:.02,bevelSize:.015,bevelThickness:.015});[[1.18,0,1.18],[-1.18,0,1.18],[1.18,0,-1.18],[-1.18,0,-1.18]].forEach(([t,n,r])=>{let i=Y(P,e.brushedAluminum,e);i.position.set(t,n,r),N.add(i)}),i(N,`15_TitaniumCornerExoFins`,[.82,1.16,-.05],.56);let F=new B;F.add(Y(G(1.66,.48,1.66,{radius:.06,bevelSize:.02,bevelThickness:.02}),e.titaniumGraphite,e));let I=new p(q(1.7,1.7,.04,.04,{radius:.07,alignY:!0,bevelSize:.005,bevelThickness:.005}),e.cyanEmissive);I.position.y=.16,F.add(I),i(F,`16_MechanicalPenthouse`,[.82,3.38,-.05],.6);let R=new B;R.add(Y(q(2.38,2.38,.28,.22,{radius:.08,alignY:!0,bevelSize:.02,bevelThickness:.02}),e.titaniumDark,e));let te=new p(q(2.42,2.42,.045,.045,{radius:.09,alignY:!0,bevelSize:.006,bevelThickness:.006}),e.amberEmissive);te.position.y=.12,R.add(te),i(R,`17_ArchitecturalCrownHalo`,[.82,3.68,-.05],.64);let z=new B;z.add(Y(G(1.82,.09,1.82,{radius:.05,bevelSize:.012,bevelThickness:.012}),e.brushedAluminum,e));let ne=G(1.4,.04,1.4,{radius:.03,bevelSize:.008,bevelThickness:.008}),V=new p(ne,e.pcbSubstrate);V.position.y=.06,z.add(V),i(z,`18_SolarCanopyRoofDeck`,[.82,3.84,-.05],.68);let H=new B;H.add(Y(G(.28,1.25,.62,{radius:.03,bevelSize:.016,bevelThickness:.016}),e.brushedAluminum,e));let U=new p(new L(.04,.96,.06),e.cyanEmissive);U.position.set(.14,0,.24),H.add(U),i(H,`19_SculpturalEntryMonument`,[-1.85,-1.36,1.82],.72);let W=new B,re=new p(J(3.38,3.31,.04,{segments:72,bevelSize:.006,bevelThickness:.006}),e.brushedAluminum);re.rotation.x=Math.PI/2,W.add(re);let ie=new L(.18,.05,.06);for(let t=0;t<4;t++){let n=t/4*Math.PI*2,r=new p(ie,t%2==0?e.amberEmissive:e.cyanEmissive);r.position.set(Math.cos(n)*3.35,.02,Math.sin(n)*3.35),r.rotation.y=-n+Math.PI/2,W.add(r)}i(W,`20_PerimeterTelemetryRing`,[0,-2.38,0],.76);function ae(e){let t=r.clamp(e,0,1);n.forEach(e=>{let n=e.userData.riseDelay*.42,i=1-(1-r.clamp((t-n)/(1-n),0,1))**3;e.position.y=e.userData.restPos.y-(1-i)*e.userData.riseDepth;let a=.84+i*.16;e.scale.setScalar(a)})}return{group:t,parts:n,partCount:n.length,setRiseProgress:ae}}function fe(e){let t=new B;t.name=`Zone2_StructuralTeardown`;let n=[],i={},a=(e,{id:r,key:a,restPos:s,explodeDelta:c,anchorLocal:l=[1.3,0,.9]})=>{e.name=r,e.position.set(...s),e.userData.key=a,e.userData.restPos=new o(...s),e.userData.explodeDelta=new o(...c);let u=new d;return u.position.set(...l),e.add(u),e.userData.anchor=u,e.traverse(e=>{e.isMesh&&!e.userData.origMaterial&&(e.userData.origMaterial=e.material)}),t.add(e),n.push(e),i[a]||(i[a]=[]),i[a].push(e),e},s=new B;s.add(Y(q(2.45,2.45,.24,.22,{radius:.08,alignY:!0,bevelSize:.02,bevelThickness:.02}),e.titaniumDark,e));let c=Y(G(1.88,.08,1.88,{radius:.04,bevelSize:.01,bevelThickness:.01}),e.pcbSubstrate,e);c.position.y=.14,s.add(c);let l=new p(q(2.5,2.5,.045,.045,{radius:.09,alignY:!0,bevelSize:.006,bevelThickness:.006}),e.amberEmissive);l.position.y=.11,s.add(l),a(s,{id:`L01_CrownSolar`,key:`crown`,restPos:[0,2.58,0],explodeDelta:[0,2.55,0],anchorLocal:[1.28,.12,.85]});let u=new B;u.add(Y(G(1.72,.42,1.72,{radius:.06,bevelSize:.02,bevelThickness:.02}),e.titaniumGraphite,e));for(let t of[-.38,.38]){let n=new p(new M(.18,.18,.92,16),e.brushedAluminum);n.rotation.z=Math.PI/2,n.position.set(0,.04,t),u.add(n)}a(u,{id:`L02_MechanicalPenthouse`,key:`crown`,restPos:[0,2.22,0],explodeDelta:[0,1.98,0],anchorLocal:[.9,.1,.7]});let f=new B,m=X(2.38,2.9,6,8,e);m.position.z=1.19;let h=X(2.38,2.9,6,8,e);h.rotation.y=Math.PI/2,h.position.x=1.19,f.add(m,h),a(f,{id:`L03_CurtainWallNE`,key:`curtainWall`,restPos:[0,.65,0],explodeDelta:[1.15,.82,.92],anchorLocal:[1.2,.75,1.15]});let g=new B,_=X(2.38,2.9,6,8,e);_.position.z=-1.19;let v=X(2.38,2.9,6,8,e);v.rotation.y=Math.PI/2,v.position.x=-1.19,g.add(_,v),a(g,{id:`L04_CurtainWallSW`,key:`curtainWall`,restPos:[0,.65,0],explodeDelta:[-1.15,.72,-.88],anchorLocal:[-1.15,.7,-1.1]});let y=new B;for(let t=0;t<3;t++){let n=Y(G(2.18,.1,2.18,{radius:.06,bevelSize:.015,bevelThickness:.015}),e.titaniumDark,e);n.position.y=(t-1)*.28,y.add(n)}a(y,{id:`L05_ExecutivePlates`,key:`floorPlates`,restPos:[0,1.62,0],explodeDelta:[0,1.4,0],anchorLocal:[1.1,.1,.7]}),a(ue(2.26,1.55,2.26,3,3,3,e),{id:`L06_UpperSteelDiagrid`,key:`steelFrame`,restPos:[0,1.18,0],explodeDelta:[-.42,.88,.35],anchorLocal:[-1.12,.1,1.12]});let b=new B;b.add(Y(G(2.68,.15,2.68,{radius:.08,bevelSize:.02,bevelThickness:.02}),e.titaniumDark,e));let x=new p(q(2.72,2.72,.045,.05,{radius:.09,alignY:!0,bevelSize:.006,bevelThickness:.006}),e.amberEmissive);b.add(x),a(b,{id:`L07_AmenitySkyDeck`,key:`floorPlates`,restPos:[0,.88,0],explodeDelta:[0,.62,0],anchorLocal:[1.36,.04,1.15]});let S=new B;for(let t=0;t<4;t++){let n=Y(G(2.22,.1,2.22,{radius:.06,bevelSize:.015,bevelThickness:.015}),e.titaniumGraphite,e);if(n.position.y=(t-1.5)*.28,S.add(n),t%2==0){let t=new p(q(2.26,2.26,.025,.03,{radius:.065,alignY:!0,bevelSize:.004,bevelThickness:.004}),e.amberEmissive);t.position.y=n.position.y,S.add(t)}}a(S,{id:`L08_OfficeFloorStack`,key:`floorPlates`,restPos:[0,.16,0],explodeDelta:[0,.05,0],anchorLocal:[1.14,.18,.85]});let C=new B;[[-.36,0,-.36],[.36,0,-.36],[-.36,0,.36],[.36,0,.36]].forEach(([t,n,r],i)=>{let a=new p(new M(.065,.065,2.55,16),i%2==0?e.cyanEmissive:e.amberEmissive);a.position.set(t,n,r),C.add(a)});for(let t=-2;t<=2;t++){let n=new p(q(1.24,1.24,.06,.08,{radius:.06,alignY:!0,bevelSize:.008,bevelThickness:.008}),t===0?e.cyanEmissive:e.brushedAluminum);n.position.y=t*.48,C.add(n)}a(C,{id:`L09_MEPHvacCore`,key:`mepCore`,restPos:[0,.6,0],explodeDelta:[.58,-.18,-.45],anchorLocal:[.64,.25,.42]}),a(Y(G(.84,2.75,.84,{radius:.04,bevelSize:.02,bevelThickness:.02}),e.concreteBasalt,e),{id:`L10_ShearConcreteCore`,key:`mepCore`,restPos:[0,.55,0],explodeDelta:[-.45,-.35,-.35],anchorLocal:[.45,.1,.45]}),a(ue(2.65,.52,2.65,4,4,1,e),{id:`L11_TransferTrussL04`,key:`steelFrame`,restPos:[0,-.72,0],explodeDelta:[0,-.75,0],anchorLocal:[-1.34,.05,1.12]});let w=new B,ee=new p(G(2.96,.64,2.96,{radius:.06,bevelSize:.018,bevelThickness:.018}),e.retailInteriorGlow);w.add(ee);let T=X(3.18,.68,7,1,e);T.position.z=1.59;let E=X(3.18,.68,7,1,e);E.rotation.y=Math.PI/2,E.position.x=1.59,w.add(T,E),a(w,{id:`L12_RetailPodiumBays`,key:`curtainWall`,restPos:[0,-1.26,0],explodeDelta:[0,-1.16,0],anchorLocal:[1.58,0,1.2]}),a(Y(G(3.65,.18,3.65,{radius:.1,bevelSize:.025,bevelThickness:.02}),e.titaniumDark,e),{id:`L13_PodiumPlazaDeck`,key:`steelFrame`,restPos:[0,-1.66,0],explodeDelta:[0,-1.56,0],anchorLocal:[1.8,.04,1.4]});let D=new B;for(let t=0;t<2;t++){let n=Y(G(3.4,.12,3.4,{radius:.08,bevelSize:.018,bevelThickness:.016}),e.concreteBasalt,e);n.position.y=t*.28-.14,D.add(n)}let O=new p(new L(2.8,.03,.06),e.cyanEmissive);O.position.set(0,.02,1.62),D.add(O),a(D,{id:`L14_SubgradeParkingVault`,key:`foundation`,restPos:[0,-2.04,0],explodeDelta:[0,-1.96,0],anchorLocal:[1.72,.02,1.25]});let k=new B;k.add(Y(G(3.75,.2,3.75,{radius:.1,bevelSize:.025,bevelThickness:.025}),e.concreteBasalt,e));let j=new M(.11,.09,.72,12);for(let t of[-1.25,0,1.25])for(let n of[-1.25,0,1.25]){let r=new p(j,e.structuralSteel);r.position.set(t,-.44,n),k.add(r)}a(k,{id:`L15_DeepMatCaissons`,key:`foundation`,restPos:[0,-2.42,0],explodeDelta:[0,-2.38,0],anchorLocal:[1.85,-.1,1.35]});let N=`mepCore`,P=!1;function F(e){let t=r.clamp(e,0,1),i=t*t*(3-2*t);n.forEach((e,t)=>{let a=t/n.length*.14,o=r.clamp((i-a*.5)/(1-a*.5),0,1);e.position.lerpVectors(e.userData.restPos,e.userData.restPos.clone().add(e.userData.explodeDelta),o)})}function I(e,t=!1){N=e,P=t,n.forEach(e=>{let t=e.userData.key===N;e.traverse(e=>{if(!e.isMesh||!e.userData.origMaterial)return;let n=e.userData.origMaterial;P&&!t?(e.visible=!0,e.userData.ghostMat||(e.userData.ghostMat=new A({color:1976635,transparent:!0,opacity:.12,wireframe:!0})),e.material=e.userData.ghostMat):(e.visible=!0,e.material=n)});let n=t?1.035:1;e.scale.setScalar(n)})}function R(e,t=new o){let n=i[e];if(!n||n.length===0)return null;let r=n[0];return r.updateWorldMatrix(!0,!1),r.userData.anchor.getWorldPosition(t),t}return{group:t,layers:n,layerCount:n.length,setExplosionProgress:F,setActiveLayer:I,getAnchorWorldPosition:R}}var Z={brandName:`NORTHSTAR INTERACTIVE`,brandShort:`NORTHSTAR`,brandDescriptor:`Interactive Web Engineering & AI Automation Studio`,tagline:`Real-time 3D architectural platforms & preconstruction intelligence for commercial developers.`,regions:`Atlanta · Spartanburg · New York`,contactEmail:`partners@northstarinteractive.studio`,bookingDomain:`cal.northstarinteractive.studio`,referenceAsset:{projectName:`THE FOUNDRY AT ROSWELL CROSSING`,assetClass:`Class-A Mixed-Use & Hospitality Tower`,grossSqFt:`418,500 GSF`,stories:`22 Stories · 3-Level Podium`,targetDelivery:`Q4 2027`}},pe=[{id:`night`,label:`Night Retail Glow`,shortLabel:`Night Glow`,code:`MODE 01`,description:`Obsidian studio backdrop with warm retail bay luminance, cyan rim sculpting, and floor-plate telemetry bloom.`},{id:`daylight`,label:`Daylight Render`,shortLabel:`Daylight`,code:`MODE 02`,description:`High-key architectural studio light evaluating massing proportions, curtain-wall reflection, and façade geometry.`},{id:`wireframe`,label:`Structural Wireframe`,shortLabel:`Wireframe`,code:`MODE 03`,description:`X-ray BIM diagnostic overlay exposing structural steel frames, shear cores, and vertical MEP risers.`}],Q=[{id:`crown`,code:`01`,calloutLabel:`01 // ROOFTOP CROWN & SOLAR`,layerKey:`crown`,title:`Architectural Crown & Penthouse`,csiDivision:`DIV 07 · Thermal & Moisture / Photovoltaic`,sqft:`18,400 GSF Mechanical + Solar Canopy`,leaseStatus:`Owner-Operated Amenity & ESG Offset`,buildCost:`$410 / SF`,costContext:`Includes acoustic chiller screen & 180 kW array`,highlights:[`Chamfered anodized aluminum crown with integrated perimeter LED cove`,`180 kW architectural bifacial canopy offsetting 24% common-area load`,`Vibration-isolated mechanical penthouse pre-modeled for crane pick sequence`]},{id:`curtainWall`,code:`02`,calloutLabel:`02 // CURTAIN WALL MULLIONS`,layerKey:`curtainWall`,title:`Unitized Curtain Wall & Mullions`,csiDivision:`DIV 08 · Openings & Glazing Systems`,sqft:`146,200 SF Façade Surface Area`,leaseStatus:`100% Shop Drawings Approved · Mill Slot Locked`,buildCost:`$142 / SF Façade`,costContext:`Triple-silver Low-E IGUs · 0.24 SHGC`,highlights:[`Pre-glazed unitized panels cut dry-in critical path by 7.5 weeks`,`Brushed titanium vertical fins reduce West-elevation solar gain by 31%`,`BIM clash detection resolved 114 slab-edge anchor conflicts pre-pour`]},{id:`floorPlates`,code:`03`,calloutLabel:`03 // FLOOR PLATE STACK`,layerKey:`floorPlates`,title:`Class-A Office & Executive Plates`,csiDivision:`DIV 03 · Post-Tensioned Concrete Slabs`,sqft:`248,000 RSF (19,200 SF Typical Plate)`,leaseStatus:`84% Pre-Leased · 2 Anchor Tenants Executed`,buildCost:`$385 / SF`,costContext:`Core & Shell GMP · 14'6" slab-to-slab clear`,highlights:[`Column-free 42-ft lease spans maximize tenant planning efficiency`,`Cantilevered Level 12 Amenity Sky-Deck with indoor-outdoor boardrooms`,`Interactive 3D stack plan shortened anchor LOI cycle from 11 to 4 weeks`]},{id:`mepCore`,code:`04`,calloutLabel:`04 // MEP / HVAC CORE`,layerKey:`mepCore`,title:`Central MEP / HVAC & Smart Riser Core`,csiDivision:`DIV 23 / 26 · Mechanical, Electrical & Controls`,sqft:`34,600 GSF Core Footprint · 1,450 Tons Cooling`,leaseStatus:`Zero Unresolved BIM Clashes · Prefab Ready`,buildCost:`$118 / SF MEP`,costContext:`DOAS + chilled beams + BACnet IP telemetry`,highlights:[`Modular prefabricated riser racks eliminate 2,400 onsite field labor hours`,`Dedicated outdoor air system (DOAS) with MERV-15 + real-time IAQ telemetry`,`Digital twin endpoints tied directly into tenant & facility BMS dashboards`]},{id:`steelFrame`,code:`05`,calloutLabel:`05 // STRUCTURAL STEEL FRAME`,layerKey:`steelFrame`,title:`Perimeter Diagrid & Transfer Truss`,csiDivision:`DIV 05 · Structural Steel Framing`,sqft:`4,280 Tons Grade-50 Structural Steel`,leaseStatus:`88% Fabricated · Erection Sequence Active`,buildCost:`$64 / SF Frame`,costContext:`Mill-direct procurement locked Q1 pricing`,highlights:[`Long-span Level 4 transfer truss opens ground retail without drop columns`,`Moment-resisting perimeter frames engineered for Seismic Design Cat C`,`Live mill-to-crane QR tracking synced to executive investor portal`]},{id:`foundation`,code:`06`,calloutLabel:`06 // FOUNDATION & CAISSONS`,layerKey:`foundation`,title:`Structured Parking Vault & Caissons`,csiDivision:`DIV 31 · Earthwork & Deep Foundations`,sqft:`112,500 GSF · 320 Structured EV-Ready Stalls`,leaseStatus:`100% Complete · Signed Off by Geotech`,buildCost:`$94 / SF Subgrade`,costContext:`68 drilled shafts socketed 45 ft to granite`,highlights:[`8-foot reinforced mat foundation under central elevator shear core`,`3-level below-grade deck with license-plate recognition & EV load balancing`,`Dewatering and shoring telemetry monitored continuously through closeout`]}],me=[{id:`optics`,layerKey:`sapphireBezel`,label:`01 // SAPPHIRE OPTICS`},{id:`display`,layerKey:`oledMatrix`,label:`02 // MICRO-OLED PORTAL`},{id:`compute`,layerKey:`aiCompute`,label:`03 // EDGE-AI COMPUTE`},{id:`chassis`,layerKey:`titaniumFrame`,label:`04 // TITANIUM CHASSIS`},{id:`bms`,layerKey:`bmsPcb`,label:`05 // BMS TELEMETRY PCB`},{id:`uwb`,layerKey:`uwbCoil`,label:`06 // UWB ACCESS COIL`}],$={investor:{id:`investor`,tabLabel:`Investor ROI View`,shortLabel:`Investor ROI`,screenTitle:`CAPITAL STACK & IRR TELEMETRY`,accent:`#D49B4B`,scenarios:{conservative:{label:`Conservative`,irr:`17.8%`,equityMultiple:`1.92x`,yieldOnCost:`7.45%`,stabilizedNoi:`$13.4M`,preLeased:`78%`,capitalStack:[{label:`Senior Construction Loan`,pct:62,amount:`$104.2M`,tone:`steel`},{label:`LP Institutional Equity`,pct:28,amount:`$47.0M`,tone:`amber`},{label:`GP Sponsor Co-Invest`,pct:10,amount:`$16.8M`,tone:`cyan`}],note:`Stress-tested at +50 bps exit cap rate (6.25%) and 4-month lease-up buffer.`},base:{label:`Base Case`,irr:`21.4%`,equityMultiple:`2.18x`,yieldOnCost:`8.12%`,stabilizedNoi:`$14.9M`,preLeased:`84%`,capitalStack:[{label:`Senior Construction Loan`,pct:62,amount:`$104.2M`,tone:`steel`},{label:`LP Institutional Equity`,pct:28,amount:`$47.0M`,tone:`amber`},{label:`GP Sponsor Co-Invest`,pct:10,amount:`$16.8M`,tone:`cyan`}],note:`5.75% exit cap · GMP locked at $168M total capitalization · Q4 2027 stabilization.`},upside:{label:`Accelerated Lease-Up`,irr:`24.6%`,equityMultiple:`2.41x`,yieldOnCost:`8.58%`,stabilizedNoi:`$15.8M`,preLeased:`94%`,capitalStack:[{label:`Senior Construction Loan`,pct:62,amount:`$104.2M`,tone:`steel`},{label:`LP Institutional Equity`,pct:28,amount:`$47.0M`,tone:`amber`},{label:`GP Sponsor Co-Invest`,pct:10,amount:`$16.8M`,tone:`cyan`}],note:`Driven by 3D pre-leasing velocity closing remaining penthouse plates 5 months early.`}}},tenant:{id:`tenant`,tabLabel:`Tenant Leasing View`,shortLabel:`Tenant Leasing`,screenTitle:`LIVE STACK PLAN & SUITE EXPLORER`,accent:`#38BDF8`,suites:[{id:`L21`,floor:`Level 21–22`,suite:`Penthouse 2100`,rsf:`18,600 RSF`,rate:`$52.00 / SF NNN`,status:`Available`,statusTone:`cyan`,tiAllowance:`$95 / SF TI`,exposure:`360° Skyline · Private Terrace`,delivery:`Q3 2027 Warm Shell`},{id:`L16`,floor:`Level 16`,suite:`Suite 1600`,rsf:`19,200 RSF`,rate:`$47.50 / SF NNN`,status:`Touring (2 LOIs)`,statusTone:`amber`,tiAllowance:`$85 / SF TI`,exposure:`North / East Panoramic Glass`,delivery:`Q2 2027 Spec Ready`},{id:`L12`,floor:`Level 12`,suite:`Amenity Sky-Deck`,rsf:`14,800 GSF`,rate:`Building Common`,status:`Tenant Exclusive`,statusTone:`neutral`,tiAllowance:`Turnkey Furnished`,exposure:`Cantilevered Deck · 120-Seat Town Hall`,delivery:`Q2 2027 Opening`},{id:`L08`,floor:`Level 08–10`,suite:`Anchor Block 800`,rsf:`57,600 RSF`,rate:`Executed · 12-Yr Term`,status:`Pre-Leased`,statusTone:`green`,tiAllowance:`$90 / SF TI`,exposure:`Dedicated Interconnecting Stair`,delivery:`Tenant Buildout Q1 2027`},{id:`L01`,floor:`Level 01–02`,suite:`Retail Podium R104`,rsf:`6,450 RSF`,rate:`$64.00 / SF NNN`,status:`Available · Flagship`,statusTone:`cyan`,tiAllowance:`$75 / SF TI + Grease Trap`,exposure:`22-Ft Glass Frontage · Plaza Patio`,delivery:`Q1 2027 Shell Delivery`}]},site:{id:`site`,tabLabel:`Site Progress Tracker`,shortLabel:`Site Progress`,screenTitle:`CRITICAL PATH & FIELD TELEMETRY`,accent:`#5EEAD4`,summary:{overallPct:71,daysAhead:`+11 Days Ahead of Baseline`,openRfis:7,safetyDays:`418 Zero-Incident Days`,gmpVariance:`-0.8% Under GMP Budget`},milestones:[{id:`fdn`,phase:`01 · Deep Foundations & Caissons`,pct:100,status:`Signed Off`,date:`Completed`},{id:`steel`,phase:`02 · Structural Steel & Diagrid`,pct:88,status:`Level 19 Topping Out`,date:`On Schedule`},{id:`glass`,phase:`03 · Unitized Curtain Wall`,pct:62,status:`Floor 13 Dry-In Active`,date:`+6 Days`},{id:`mep`,phase:`04 · Central MEP / HVAC Risers`,pct:47,status:`Prefab Modules Hoisting`,date:`On Schedule`},{id:`closeout`,phase:`05 · Commissioning & Closeout`,pct:14,status:`Digital Twin QA Live`,date:`Target Q4 2027`}]}},he=[{id:`mixed-use`,label:`Mixed-Use Development`,short:`Mixed-Use`,baseCost:44e3,sqftFactor:.048,baseWeeks:6.5,carryMonthlyPer100k:285e3,leaseAccelerationMonths:2.6,hoursSavedBase:420,deliverableFocus:`3D massing explorer, vertical structural teardown, retail/office stack plan & LP investor data room.`},{id:`hospitality`,label:`Hospitality / Hotel`,short:`Hospitality`,baseCost:39e3,sqftFactor:.044,baseWeeks:6,carryMonthlyPer100k:24e4,leaseAccelerationMonths:2.2,hoursSavedBase:360,deliverableFocus:`Day-to-night architectural ambiance engine, amenity floor previews, capital partner pitch deck & ADR calculator.`},{id:`commercial`,label:`Commercial Build / GC`,short:`Commercial Build`,baseCost:34e3,sqftFactor:.036,baseWeeks:5.5,carryMonthlyPer100k:195e3,leaseAccelerationMonths:1.9,hoursSavedBase:510,deliverableFocus:`Preconstruction BIM phasing showcase, live GMP scope estimator, subcontractor/RFP qualification portal.`},{id:`enterprise`,label:`Custom Enterprise Platform`,short:`Custom Enterprise`,baseCost:48e3,sqftFactor:.052,baseWeeks:7.5,carryMonthlyPer100k:31e4,leaseAccelerationMonths:2.8,hoursSavedBase:640,deliverableFocus:`Bespoke WebGL product/facility twin, interactive executive ROI engine & automated CRM/AI intake pipeline.`}],ge=[{id:`accelerated`,label:`Accelerated (4–6 Wks)`,multiplier:1.24,weekFactor:.78,badge:`Dedicated Sprint Squad`},{id:`standard`,label:`Standard (8–12 Wks)`,multiplier:1,weekFactor:1,badge:`Optimal Engineering Pace`},{id:`portfolio`,label:`Multi-Phase (16+ Wks)`,multiplier:1.38,weekFactor:1.55,badge:`Multi-Asset Portfolio Rollout`}],_e=[{id:`twin3d`,label:`3D Scroll-Scrubbed Architectural Twin`,costAdd:12e3,weeksAdd:1.2,hoursAdd:110,valueBoost:1.18,defaultOn:!0},{id:`leasing`,label:`Interactive Floor-Plate & Leasing Explorer`,costAdd:8500,weeksAdd:.8,hoursAdd:145,valueBoost:1.15,defaultOn:!0},{id:`investor`,label:`Investor Data Room & Live IRR Telemetry`,costAdd:9500,weeksAdd:.9,hoursAdd:160,valueBoost:1.16,defaultOn:!1},{id:`aiIntake`,label:`AI Preconstruction & RFI Intake Automation`,costAdd:11e3,weeksAdd:1.1,hoursAdd:240,valueBoost:1.12,defaultOn:!1}],ve=[{id:`prototype`,code:`TIER 01`,name:`48-Hour Prototype`,subtitle:`Executive Pitch & Deal Validation Sprint`,priceLow:6500,priceHigh:6500,priceDisplay:`$6,500 Fixed`,turnaroundDays:2,turnaroundLabel:`48 Hours`,idealFor:`Active IC approvals, LP fundraising decks, or RFP shortlist presentations.`,deliverables:[`Custom 3D interactive architectural hero scene with your real site massing`,`Live lighting/material switcher + 1 clickable spec teardown module`,`Deployed private preview URL ready for boardroom & mobile presentation`,`100% fee credited toward a full Flagship build within 30 days`]},{id:`flagship`,code:`TIER 02 · RECOMMENDED`,name:`3D Scrollytelling Flagship`,subtitle:`Full Commercial Development Platform`,priceLow:38e3,priceHigh:65e3,priceDisplay:`$38K – $65K`,turnaroundDays:42,turnaroundLabel:`5–7 Weeks`,recommended:!0,idealFor:`Developers, GCs, and institutional operators launching marquee mixed-use assets or company rebrands.`,deliverables:[`Multi-zone 60 FPS PBR 3D scrollytelling engine (desktop + mobile tuned)`,`Exploded preconstruction layers, 3D hotspot pins & live portal views`,`Embedded B2B Project Scope / ROI Estimator tuned to your exact margins`,`Full source ownership, analytics instrumentation & executive CMS handoff`]},{id:`workflow`,code:`TIER 03`,name:`Custom AI Workflow App`,subtitle:`Preconstruction, Closeout & Automation Stack`,priceLow:28e3,priceHigh:55e3,priceDisplay:`$28K – $55K`,turnaroundDays:38,turnaroundLabel:`4–8 Weeks`,idealFor:`Operations teams eliminating manual bid-leveling, RFI triage, and investor reporting bottlenecks.`,deliverables:[`Bespoke full-stack web app with real-time executive telemetry UI`,`Automated proposal, scope-brief & sub-qualification AI pipelines`,`API bridges to Procore, HubSpot, Salesforce, or internal BIM models`,`Role-based access controls, audit logging & team onboarding workshop`]}],ye=[{id:`pitchSync`,label:`Boardroom Pitch Deck Sync`,costAdd:4500,daysAdd:4},{id:`fieldMode`,label:`Offline Mobile Field Tablet Mode`,costAdd:5500,daysAdd:5},{id:`sla`,label:`90-Day Priority Studio SLA`,costAdd:6e3,daysAdd:0}];function be(){let e=document.createElement(`canvas`);e.width=512,e.height=800;let t=e.getContext(`2d`),n=new j(e);n.colorSpace=H,n.anisotropy=4;function r(e,n,r,i,a){t.beginPath(),t.moveTo(e+a,n),t.lineTo(e+r-a,n),t.quadraticCurveTo(e+r,n,e+r,n+a),t.lineTo(e+r,n+i-a),t.quadraticCurveTo(e+r,n+i,e+r-a,n+i),t.lineTo(e+a,n+i),t.quadraticCurveTo(e,n+i,e,n+i-a),t.lineTo(e,n+a),t.quadraticCurveTo(e,n,e+a,n),t.closePath()}function i(e=`investor`,i={}){t.fillStyle=`#07090D`,t.fillRect(0,0,512,800);let a=e===`investor`?`#E5A34B`:e===`tenant`?`#38BDF8`:`#5EEAD4`,o=t.createLinearGradient(0,0,512,160);o.addColorStop(0,e===`investor`?`rgba(229,163,75,0.18)`:`rgba(56,189,248,0.18)`),o.addColorStop(1,`rgba(7,9,13,0)`),t.fillStyle=o,t.fillRect(0,0,512,160),t.strokeStyle=`rgba(255,255,255,0.12)`,t.lineWidth=1.5,t.beginPath(),t.moveTo(28,76),t.lineTo(484,76),t.stroke(),t.fillStyle=`#E2E8F0`,t.font=`600 18px monospace`,t.fillText(Z.brandShort+` // OS v4.2`,28,48),t.fillStyle=a,t.font=`600 14px monospace`,t.textAlign=`right`,t.fillText(`LIVE BMS SYNC ●`,484,48),t.textAlign=`left`,t.fillStyle=a,t.font=`700 15px monospace`;let s=$[e]?.screenTitle||`PORTAL TELEMETRY`;if(t.fillText(s,28,114),t.fillStyle=`#94A3B8`,t.font=`500 14px sans-serif`,t.fillText(Z.referenceAsset.projectName,28,138),e===`investor`){let e=i.scenario||`base`,n=$.investor.scenarios[e]||$.investor.scenarios.base;r(28,168,456,152,14),t.fillStyle=`rgba(255,255,255,0.04)`,t.fill(),t.strokeStyle=`rgba(229,163,75,0.45)`,t.stroke(),t.fillStyle=`#94A3B8`,t.font=`600 14px monospace`,t.fillText(`TARGET IRR // ${n.label.toUpperCase()}`,48,204),t.fillStyle=`#F8FAFC`,t.font=`700 66px sans-serif`,t.fillText(n.irr,48,280),t.fillStyle=`#E5A34B`,t.font=`600 22px monospace`,t.textAlign=`right`,t.fillText(n.equityMultiple+` EM`,464,248),t.fillStyle=`#94A3B8`,t.font=`500 16px monospace`,t.fillText(`YoC `+n.yieldOnCost,464,280),t.textAlign=`left`,[{k:`STABILIZED NOI`,v:n.stabilizedNoi},{k:`PRE-LEASED`,v:n.preLeased}].forEach((e,n)=>{let i=28+n*236;r(i,342,220,96,12),t.fillStyle=`rgba(255,255,255,0.035)`,t.fill(),t.strokeStyle=`rgba(255,255,255,0.1)`,t.stroke(),t.fillStyle=`#94A3B8`,t.font=`600 13px monospace`,t.fillText(e.k,i+18,374),t.fillStyle=`#F8FAFC`,t.font=`700 32px sans-serif`,t.fillText(e.v,i+18,418)}),t.fillStyle=`#CBD5E1`,t.font=`600 14px monospace`,t.fillText(`CAPITAL STACK ALLOCATION ($168.0M)`,28,486),n.capitalStack.forEach((e,n)=>{let i=514+n*68;t.fillStyle=`#CBD5E1`,t.font=`500 15px sans-serif`,t.fillText(e.label,28,i),t.textAlign=`right`,t.fillStyle=`#F8FAFC`,t.font=`600 15px monospace`,t.fillText(`${e.amount} (${e.pct}%)`,484,i),t.textAlign=`left`,r(28,i+14,456,14,6),t.fillStyle=`rgba(255,255,255,0.08)`,t.fill();let a=456*e.pct/100;r(28,i+14,a,14,6),t.fillStyle=e.tone===`amber`?`#E5A34B`:e.tone===`cyan`?`#38BDF8`:`#64748B`,t.fill()})}else if(e===`tenant`){let e=i.suiteId||`L21`,n=$.tenant.suites;t.fillStyle=`#CBD5E1`,t.font=`600 14px monospace`,t.fillText(`VERTICAL STACK PLAN // SELECT FLOOR`,28,178),n.forEach((n,i)=>{let a=202+i*96,o=n.id===e;r(28,a,456,80,10),t.fillStyle=o?`rgba(56,189,248,0.16)`:`rgba(255,255,255,0.035)`,t.fill(),t.strokeStyle=o?`#38BDF8`:`rgba(255,255,255,0.1)`,t.lineWidth=o?2:1,t.stroke(),t.fillStyle=o?`#38BDF8`:`#94A3B8`,t.font=`700 15px monospace`,t.fillText(n.floor.toUpperCase(),46,a+32),t.fillStyle=`#F8FAFC`,t.font=`600 19px sans-serif`,t.fillText(n.suite,46,a+60),t.textAlign=`right`,t.fillStyle=`#E2E8F0`,t.font=`600 16px monospace`,t.fillText(n.rsf,466,a+32),t.fillStyle=n.statusTone===`amber`?`#E5A34B`:n.statusTone===`green`?`#4ADE80`:`#38BDF8`,t.font=`600 14px monospace`,t.fillText(n.status.toUpperCase(),466,a+60),t.textAlign=`left`})}else{let e=$.site.summary;r(28,168,456,124,14),t.fillStyle=`rgba(94,234,212,0.09)`,t.fill(),t.strokeStyle=`rgba(94,234,212,0.45)`,t.stroke(),t.fillStyle=`#94A3B8`,t.font=`600 14px monospace`,t.fillText(`OVERALL GMP COMPLETION`,48,204),t.fillStyle=`#F8FAFC`,t.font=`700 56px sans-serif`,t.fillText(`${e.overallPct}%`,48,268),t.textAlign=`right`,t.fillStyle=`#5EEAD4`,t.font=`600 16px monospace`,t.fillText(e.daysAhead.toUpperCase(),464,232),t.fillStyle=`#CBD5E1`,t.font=`500 14px monospace`,t.fillText(e.gmpVariance,464,262),t.textAlign=`left`,$.site.milestones.forEach((e,n)=>{let i=328+n*78;t.fillStyle=`#E2E8F0`,t.font=`600 15px sans-serif`,t.fillText(e.phase,28,i),t.textAlign=`right`,t.fillStyle=`#5EEAD4`,t.font=`700 16px monospace`,t.fillText(`${e.pct}%`,484,i),t.textAlign=`left`,r(28,i+14,456,12,6),t.fillStyle=`rgba(255,255,255,0.08)`,t.fill(),r(28,i+14,456*e.pct/100,12,6),t.fillStyle=e.pct===100?`#4ADE80`:`#5EEAD4`,t.fill(),t.fillStyle=`#64748B`,t.font=`500 13px monospace`,t.fillText(e.status,28,i+46)})}t.strokeStyle=`rgba(255,255,255,0.1)`,t.beginPath(),t.moveTo(28,738),t.lineTo(484,738),t.stroke(),t.fillStyle=`#64748B`,t.font=`500 13px monospace`,t.fillText(`BACNET-IP · POE++ 60W · UWB READY`,28,770),t.fillStyle=a,t.textAlign=`right`,t.fillText(`60 FPS WEBGL`,484,770),t.textAlign=`left`,n.needsUpdate=!0}return i(`investor`,{scenario:`base`}),{texture:n,render:i}}function xe(e){let t=new B;t.name=`Zone3_SmartHardwareTeardown`;let n=be(),i=[],a={},s=(e,{id:n,key:r,restZ:o,explodeZ:s,anchorLocal:c=[1.15,.2,0]})=>{e.name=n,e.position.set(0,0,o),e.userData.restZ=o,e.userData.explodeZ=s,e.userData.key=r;let l=new d;return l.position.set(...c),e.add(l),e.userData.anchor=l,r&&(a[r]=l),t.add(e),i.push(e),e},l=2.05,u=3.25,f=new B,m=new p(K(l,u,.055,{radius:.22,bevelSize:.025,bevelThickness:.02}),e.sapphireGlass);f.add(m);let h=new p(q(2.07,3.27,.04,.045,{radius:.22,bevelSize:.008,bevelThickness:.008}),e.brushedAluminum);f.add(h),s(f,{id:`HW01_SapphireFrontBezel`,key:`sapphireBezel`,restZ:.26,explodeZ:2.68,anchorLocal:[1.05,1.15,0]});let g=new B,_=new k({map:n.texture,emissive:new T(0xffffff),emissiveMap:n.texture,emissiveIntensity:.95,roughness:.14,metalness:.1}),v=new p(new c(1.8699999999999999,3.05),_);v.position.z=.018,g.add(v);let y=new p(K(1.9099999999999997,3.09,.03,{radius:.16,bevelSize:.01,bevelThickness:.008}),e.titaniumDark);y.position.z=-.012,g.add(y),s(g,{id:`HW02_MicroOLEDMatrix`,key:`oledMatrix`,restZ:.2,explodeZ:2.15,anchorLocal:[-1.02,.72,0]});let b=new B,x=new p(K(1.8499999999999999,3.01,.02,{radius:.14,bevelSize:.006,bevelThickness:.005}),e.curtainGlass);b.add(x);let S=new p(new L(.46,.26,.014),e.machinedCopper);S.position.set(0,-1.545,-.01),b.add(S),s(b,{id:`HW03_CapacitiveDigitizer`,key:null,restZ:.16,explodeZ:1.72});let C=new B,w=new p(J(.26,.17,.08,{segments:40,bevelSize:.012,bevelThickness:.012}),e.brushedAluminum),ee=new p(J(.15,.08,.06,{segments:32,bevelSize:.008,bevelThickness:.008}),e.cyanEmissive),E=new p(new M(.08,.08,.04,24),e.sapphireGlass);E.rotation.x=Math.PI/2,C.add(w,ee,E),C.position.y=1.24;let D=new B;D.add(C),s(D,{id:`HW04_OpticalBiometricSensor`,key:null,restZ:.12,explodeZ:1.32});let O=new B,A=Y(q(2.13,3.33,.26,.16,{radius:.24,bevelSize:.025,bevelThickness:.022}),e.titaniumDark,e);O.add(A);let j=new p(new L(1.9099999999999997,.07,.12),e.titaniumGraphite);j.position.y=.65;let N=new p(new L(1.9099999999999997,.07,.12),e.titaniumGraphite);N.position.y=-.65;let P=new p(new L(.05,.36,.1),e.brushedAluminum);P.position.set(1.085,.55,0);let F=new p(new L(.05,.22,.1),e.amberEmissive);F.position.set(1.085,.16,0),O.add(j,N,P,F),s(O,{id:`HW05_TitaniumUnibodyChassis`,key:`titaniumFrame`,restZ:.04,explodeZ:.78,anchorLocal:[1.14,.22,0]});let I=new B,R=Y(K(1.69,2.5300000000000002,.05,{radius:.1,bevelSize:.012,bevelThickness:.01}),e.machinedCopper,e);I.add(R);let te=new L(1.5299999999999998,.028,.08);for(let t=-7;t<=7;t++){let n=new p(te,e.machinedCopper);n.position.set(0,t*.14,-.04),I.add(n)}s(I,{id:`HW06_CopperVaporChamber`,key:null,restZ:-.01,explodeZ:.26});let z=new B,ne=Y(K(1.26,1.15,.055,{radius:.06,bevelSize:.012,bevelThickness:.01}),e.pcbSubstrate,e),V=Y(K(.68,.68,.08,{radius:.04,bevelSize:.012,bevelThickness:.01}),e.brushedAluminum,e);V.position.z=.045;let H=new p(q(.84,.84,.02,.03,{radius:.05,bevelSize:.004,bevelThickness:.004}),e.cyanEmissive);H.position.z=.032,z.add(ne,V,H);let U=new B;z.position.y=.35,U.add(z),s(U,{id:`HW07_EdgeAIComputeSoC`,key:`aiCompute`,restZ:-.04,explodeZ:-.22,anchorLocal:[.85,.42,0]});let W=new B;W.add(Y(K(1.7299999999999998,2.83,.05,{radius:.1,bevelSize:.01,bevelThickness:.008}),e.pcbSubstrate,e));let re=new L(.24,.24,.055);[[-.52,.95],[.52,.95],[-.5,-.58],[.48,-.58],[0,-.98]].forEach(([t,n])=>{let r=new p(re,e.titaniumGraphite);r.position.set(t,n,.04),W.add(r)});let ie=new p(new L(1.36,.035,.03),e.amberEmissive);ie.position.set(0,-.22,.034);let ae=new p(new L(.035,2.1,.03),e.cyanEmissive);ae.position.set(-.62,0,.034),W.add(ie,ae),s(W,{id:`HW08_BMSTelemetryPCB`,key:`bmsPcb`,restZ:-.07,explodeZ:-.68,anchorLocal:[-.92,-.25,0]});let oe=new B,se=new B;se.add(Y(K(1.42,.24,.08,{radius:.05,bevelSize:.012,bevelThickness:.01}),e.brushedAluminum,e));for(let t=-2;t<=2;t++){let n=new p(new M(.03,.03,.06,12),e.cyanEmissive);n.rotation.x=Math.PI/2,n.position.set(t*.24,0,.03),se.add(n)}se.position.y=1.18,oe.add(se),s(oe,{id:`HW09_mmWaveSensorArray`,key:null,restZ:-.09,explodeZ:-1.04});let ce=new B,le=new B,G=new p(J(.56,.44,.05,{segments:56,bevelSize:.01,bevelThickness:.008}),e.machinedCopper),X=new p(J(.39,.31,.04,{segments:48,bevelSize:.008,bevelThickness:.008}),e.machinedCopper),ue=new p(J(.43,.405,.03,{segments:56,bevelSize:.004,bevelThickness:.004}),e.amberEmissive);le.add(G,X,ue),le.position.y=-.35,ce.add(le),s(ce,{id:`HW10_UWBMobileAccessCoil`,key:`uwbCoil`,restZ:-.11,explodeZ:-1.4,anchorLocal:[.65,-.35,0]});let de=new B,fe=new B;fe.add(Y(K(1.32,.48,.14,{radius:.06,bevelSize:.015,bevelThickness:.012}),e.titaniumGraphite,e));let Z=new p(new L(.24,.22,.18),e.brushedAluminum);Z.position.set(.38,0,-.04),fe.add(Z),fe.position.y=-1.04,de.add(fe),s(de,{id:`HW11_PoEPowerDeliveryBlock`,key:null,restZ:-.13,explodeZ:-1.72});let pe=new B,Q=new B;Q.add(Y(K(1.58,.22,.1,{radius:.05,bevelSize:.012,bevelThickness:.01}),e.titaniumDark,e));for(let t=-5;t<=5;t++){let n=new p(new L(.06,.09,.11),e.brushedAluminum);n.position.set(t*.12,0,.01),Q.add(n)}Q.position.y=-1.36,pe.add(Q),s(pe,{id:`HW12_AcousticBeamformingBar`,key:null,restZ:-.14,explodeZ:-1.96});let me=new B,$=new B;$.add(Y(K(.46,.92,.045,{radius:.03,bevelSize:.008,bevelThickness:.008}),e.pcbSubstrate,e));let he=new p(new L(.32,.56,.06),e.brushedAluminum);$.add(he),$.position.set(-.56,.12,0),me.add($),s(me,{id:`HW13_NVMeDigitalTwinModule`,key:null,restZ:-.15,explodeZ:-2.18});let ge=new B;ge.add(Y(K(2.09,3.29,.09,{radius:.22,bevelSize:.022,bevelThickness:.02}),e.titaniumDark,e));let _e=new M(.045,.045,.11,16);[[-1.025+.24,u/2-.24],[l/2-.24,u/2-.24],[-1.025+.24,-1.385],[l/2-.24,-1.385]].forEach(([t,n])=>{let r=new p(_e,e.brushedAluminum);r.rotation.x=Math.PI/2,r.position.set(t,n,0),ge.add(r)}),s(ge,{id:`HW14_MachinedRearBackplate`,key:null,restZ:-.18,explodeZ:-2.48});let ve=new B;ve.add(Y(q(1.48,2.24,.1,.18,{radius:.12,bevelSize:.016,bevelThickness:.015}),e.brushedAluminum,e));let ye=new p(new L(.14,1.85,.08),e.titaniumGraphite);ve.add(ye),s(ve,{id:`HW15_ArchitecturalWallDock`,key:null,restZ:-.24,explodeZ:-2.92});function xe(e){let n=r.clamp(e,0,1),a=n*n*(3-2*n);i.forEach(e=>{e.position.z=r.lerp(e.userData.restZ,e.userData.explodeZ,a)}),t.rotation.y=r.lerp(-.28,-.78,a),t.rotation.x=r.lerp(.06,.14,a)}function Se(e,t){n.render(e,t)}function Ce(e,n=new o){let r=a[e];return r?(t.updateWorldMatrix(!0,!0),r.getWorldPosition(n),n):null}return{group:t,layers:i,layerCount:i.length,setExplosionProgress:xe,updatePortalDisplay:Se,getAnchorWorldPosition:Ce}}function Se(e){let t=new B;t.name=`Zone4_AmbientWireframe`,[{w:2.2,h:5.4,d:2.2,x:-4.2,z:-3.2},{w:1.7,h:3.8,d:1.9,x:-1.8,z:-4.8},{w:2.6,h:6.2,d:2.4,x:4.4,z:-3.5},{w:1.8,h:3.2,d:1.8,x:2,z:-5.2},{w:3.4,h:1.4,d:2.6,x:0,z:-4.2}].forEach((n,r)=>{let a=new L(n.w,n.h,n.d,2,4,2),o=new E(a,10),s=r%2==0?e.ambientWireLine:e.ambientGoldLine,c=new i(o,s);c.position.set(n.x,n.h/2-2.6,n.z),t.add(c)});let n=(e,t,n)=>{let r=[];for(let n=0;n<=96;n++){let i=n/96*Math.PI*2;r.push(new o(Math.cos(i)*e,t,Math.sin(i)*e))}return new ne(new w().setFromPoints(r),n)},r=n(7.6,-2.5,e.ambientWireLine),a=n(5.4,-2.45,e.ambientGoldLine),s=n(6.8,2.2,e.ambientWireLine);s.rotation.z=.08,t.add(r,a,s);function c(e){t.rotation.y=e*.045,s.rotation.y=-e*.07}return{group:t,update:c}}function Ce(e){let t=new B;t.name=`Zone5_MagneticStudioEmblem`;let n=[],i=(e,r,i,a,s,c=0)=>(e.userData.restPos=new o(...r),e.userData.restRot=new x(...i),e.userData.scatterPos=new o(...a),e.userData.scatterRot=new x(...s),e.userData.delay=c,t.add(e),n.push(e),e),a=new f(.46,0);i(new p(a,e.cyanEmissive),[0,0,0],[0,0,0],[0,3.2,-2.5],[1.8,2.2,.8],0);let s=new F(.86,1.05,4);i(new p(s,e.sapphireGlass),[0,.56,0],[0,Math.PI/4,0],[-2.8,3.8,1.8],[1.2,-1.5,.9],.06),i(new p(s,e.sapphireGlass),[0,-.56,0],[Math.PI,Math.PI/4,0],[2.6,-3.6,1.6],[-1.1,1.7,-.8],.08);let c=G(.24,1.68,.42,{radius:.03,bevelSize:.02,bevelThickness:.02});for(let t=0;t<8;t++){let n=t/8*Math.PI*2,r=t%2==0,a=r?1.18:.96,o=Y(c,r?e.titaniumDark:e.titaniumGraphite,e),s=Math.cos(n)*a,l=Math.sin(n)*a,u=r?0:t%4==1?.22:-.22,d=4.6+t%3*1.1,f=(t%2==0?1:-1)*(2.2+t%3*.8);i(o,[s,u,l],[0,-n,r?.14:-.18],[Math.cos(n+.9)*d,f,Math.sin(n+.9)*d],[n*.7,n*1.4,(t%2?1:-1)*1.2],.1+t*.03)}let l=G(.14,.92,.18,{radius:.02,bevelSize:.014,bevelThickness:.014});[{pos:[0,1.56,0],rot:[0,0,0],scatter:[.4,5.2,-1.8]},{pos:[0,-1.56,0],rot:[0,0,Math.PI],scatter:[-.6,-5,2]},{pos:[1.68,0,0],rot:[0,0,-Math.PI/2],scatter:[5.4,1.2,-2.2]},{pos:[-1.68,0,0],rot:[0,0,Math.PI/2],scatter:[-5.4,-1.2,2.2]}].forEach((t,n)=>{let r=Y(l,e.brushedAluminum,e);i(r,t.pos,t.rot,t.scatter,[1.4-n*.5,2.1,-1.3],.24+n*.04)});let u=new v(1.76,.045,16,28,Math.PI/2-.14);for(let t=0;t<4;t++){let n=Math.PI/2*t+.07,r=new p(u,e.amberEmissive),a=new B;r.rotation.z=n,a.add(r);let o=n+Math.PI/4;i(a,[0,0,0],[Math.PI/2.25,0,0],[Math.cos(o)*4.2,t%2==0?2.6:-2.6,Math.sin(o)*4.2],[Math.PI/2+1.1,o,-.8],.34+t*.03)}i(new p(J(2.14,2.02,.1,{segments:72,bevelSize:.015,bevelThickness:.015}),e.titaniumDark),[0,0,0],[.35,-.25,0],[0,-4.4,-3.5],[1.8,1.2,.9],.42);let d=G(.22,.22,.22,{radius:.03,bevelSize:.016,bevelThickness:.016});for(let t=0;t<4;t++){let n=t/4*Math.PI*2+Math.PI/4;i(Y(d,t%2==0?e.brushedAluminum:e.amberEmissive,e),[Math.cos(n)*2.08,Math.sin(n)*.52,Math.sin(n)*2.08],[.4,n,.4],[Math.cos(n)*6.2,t%2==0?3.5:-3.5,Math.sin(n)*6.2],[2.1,-1.6,1.2],.46+t*.02)}function m(e){let t=r.clamp(e,0,1);n.forEach(e=>{let n=e.userData.delay*.35,i=r.clamp((t-n)/(1-n),0,1),a=1-(1-i)**3.2,o=Math.sin(i*Math.PI)*.75*(1-a);e.position.lerpVectors(e.userData.scatterPos,e.userData.restPos,a),e.position.x+=Math.cos(i*4)*o,e.position.z+=Math.sin(i*4)*o,e.rotation.x=r.lerp(e.userData.scatterRot.x,e.userData.restRot.x,a),e.rotation.y=r.lerp(e.userData.scatterRot.y,e.userData.restRot.y,a),e.rotation.z=r.lerp(e.userData.scatterRot.z,e.userData.restRot.z,a)})}function h(e,n){let r=.22+(1-n)*.15;t.rotation.y=e*r,t.position.y=Math.sin(e*1.1)*.08*n}return m(0),{group:t,shardCount:n.length,setReassemblyProgress:m,update:h}}var we=class{constructor(e){this.canvas=e,this.isMobile=window.innerWidth<1024,this.width=window.innerWidth,this.height=window.innerHeight,this.state={activeZone:1,zoneWeights:{z1:1,z2:0,z3:0,z4:0,z5:0},z1Rise:0,z2Explode:0,z3Explode:0,z5Reassemble:0,lightingMode:`night`,orbitYaw:-.58,orbitTargetYaw:-.58,orbitPitch:.24,orbitTargetPitch:.24,orbitAutoSpin:!0,pointerX:0,pointerY:0},this.camPos=new o(7.8,3.9,13),this.camTarget=new o(-2.35,.68,0),this.desiredCamPos=new o(7.8,3.9,13),this.desiredCamTarget=new o(-2.35,.68,0),this.tempVec=new o,this.onProjectAnchors=null,this.clock=new ee,this.rafId=null,this._initRenderer(),this._initScene(),this._initPostProcessing(),this._initAssemblies(),this._bindEvents(),W.to(this.state,{z1Rise:1,duration:1.65,ease:`power3.out`,delay:.15}),this.start()}_initRenderer(){this.renderer=new P({canvas:this.canvas,antialias:!0,powerPreference:`high-performance`,alpha:!1});let e=this.renderer.getContext(),t=e.getExtension(`WEBGL_debug_renderer_info`),n=t?String(e.getParameter(t.UNMASKED_RENDERER_WEBGL)):``;this.isSoftwareGPU=/swiftshader|llvmpipe|software/i.test(n),this.renderer.setSize(this.width,this.height,!1),this.renderer.setPixelRatio(this.isSoftwareGPU?1:Math.min(window.devicePixelRatio,this.isMobile?1.5:2)),this.renderer.toneMapping=4,this.renderer.toneMappingExposure=1.08,this.renderer.shadowMap.enabled=!this.isSoftwareGPU,this.renderer.shadowMap.type=2,this.renderer.transmissionResolutionScale=this.isSoftwareGPU?.25:this.isMobile?.45:.6}_initScene(){this.scene=new t,this.bgColor=new T(460810),this.scene.background=this.bgColor,this.scene.fog=new C(460810,.022),this.camera=new a(this.isMobile?44:35,this.width/this.height,.1,90),this.camera.position.copy(this.camPos),this.envMap=se(this.renderer),this.scene.environment=this.envMap,this.lights=ce(this.scene),this.datumFloor=le(),this.scene.add(this.datumFloor.group)}_initPostProcessing(){let e=new l(this.width,this.height,{type:g,samples:this.isMobile||this.isSoftwareGPU?0:4});this.composer=new O(this.renderer,e),this.renderPass=new I(this.scene,this.camera),this.composer.addPass(this.renderPass),this.bloomPass=new N(new b(this.width,this.height),.34,.46,1.02),this.composer.addPass(this.bloomPass),this.outputPass=new R,this.composer.addPass(this.outputPass)}_initAssemblies(){this.materials=oe(this.isMobile),this.isSoftwareGPU&&(this.materials.curtainGlass.transmission=0,this.materials.curtainGlass.opacity=.52,this.materials.sapphireGlass.transmission=0,this.materials.sapphireGlass.opacity=.45),this.zone1=de(this.materials),this.zone2=fe(this.materials),this.zone3=xe(this.materials),this.zone4=Se(this.materials),this.zone5=Ce(this.materials),this.zone2.group.visible=!1,this.zone3.group.visible=!1,this.zone4.group.visible=!1,this.zone5.group.visible=!1,this.scene.add(this.zone1.group,this.zone2.group,this.zone3.group,this.zone4.group,this.zone5.group)}_bindEvents(){window.addEventListener(`resize`,this._handleResize),window.addEventListener(`pointermove`,this._handlePointerMove,{passive:!0})}_handleResize=()=>{this.width=window.innerWidth,this.height=window.innerHeight,this.isMobile=this.width<1024,this.camera.fov=this.isMobile?44:36,this.camera.aspect=this.width/this.height,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height,!1),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.isMobile?1.5:2)),this.composer.setSize(this.width,this.height),this.bloomPass.resolution.set(this.width,this.height)};_handlePointerMove=e=>{this.state.pointerX=(e.clientX/this.width-.5)*2,this.state.pointerY=(e.clientY/this.height-.5)*2};attachOrbitSurface(e){if(!e)return;let t=!1,n=!1,i=0,a=0,o=0,s=0;e.addEventListener(`pointerdown`,r=>{r.target.closest(`button, a, input, select`)||(t=!0,n=r.pointerType===`mouse`,i=o=r.clientX,a=s=r.clientY,this.state.orbitAutoSpin=!1,e.classList.add(`is-orbiting`))}),window.addEventListener(`pointermove`,c=>{if(!t)return;let l=c.clientX-o,u=c.clientY-s;if(!n){let r=Math.abs(c.clientX-i),o=Math.abs(c.clientY-a);if(r>8&&r>o*1.15)n=!0;else if(o>12){t=!1,e.classList.remove(`is-orbiting`);return}}n&&(this.state.orbitTargetYaw+=l*.0095,this.state.orbitTargetPitch=r.clamp(this.state.orbitTargetPitch+u*.0045,-.08,.55)),o=c.clientX,s=c.clientY},{passive:!0});let c=()=>{t&&(t=!1,n=!1,e.classList.remove(`is-orbiting`))};window.addEventListener(`pointerup`,c),window.addEventListener(`pointercancel`,c)}resetOrbit(){this.state.orbitTargetYaw=-.58,this.state.orbitTargetPitch=.24,this.state.orbitAutoSpin=!0}setLightingMode(e){this.state.lightingMode=e;let t=e===`daylight`,n=e===`wireframe`,r=t?new T(1778738):n?new T(263949):new T(460810);W.to(this.bgColor,{r:r.r,g:r.g,b:r.b,duration:.7,ease:`power2.out`,onUpdate:()=>{this.scene.background.copy(this.bgColor),this.scene.fog.color.copy(this.bgColor)}}),W.to(this.lights.keyLight,{intensity:t?5.2:n?.85:2.35,duration:.7}),W.to(this.lights.hemiLight,{intensity:t?2.1:n?.35:.45,duration:.7}),W.to(this.lights.coolRimLight,{intensity:t?2.2:n?4.4:2.85,duration:.7}),W.to(this.lights.warmRimLight,{intensity:t?2.1:n?.45:2.65,duration:.7}),W.to(this.lights.retailPointLight,{intensity:t?.25:n?.35:4.2,duration:.7}),W.to(this.bloomPass,{strength:t?.1:n?.48:.36,threshold:t?1.25:n?.78:1,duration:.7}),W.to(this.renderer,{toneMappingExposure:t?1.45:n?1.16:1.1,duration:.7});let i=t?new T(2633789):n?new T(462103):new T(1580068),a=t?new T(3818839):n?new T(660258):new T(2435894),o=t?new T(0xb6c1d1):n?new T(1782861):new T(7239815);W.to(this.materials.titaniumDark.color,{r:i.r,g:i.g,b:i.b,duration:.6}),W.to(this.materials.titaniumGraphite.color,{r:a.r,g:a.g,b:a.b,duration:.6}),W.to(this.materials.brushedAluminum.color,{r:o.r,g:o.g,b:o.b,duration:.6}),W.to(this.materials.retailInteriorGlow,{emissiveIntensity:t?.14:n?.1:2.05,duration:.7}),W.to(this.materials.amberEmissive,{emissiveIntensity:t?.55:n?1.1:1.65,duration:.7}),W.to(this.materials.bimWireframeLine,{opacity:n?.92:0,duration:.55}),W.to(this.materials.cadEdgeLine,{opacity:n?0:t?.28:.14,duration:.55}),W.to(this.materials.curtainGlass,{opacity:n?.22:this.isSoftwareGPU?.52:.92,duration:.55})}setZone2Hotspot(e,t=!1){this.zone2.setActiveLayer(e,t)}updateKioskPortalScreen(e,t={}){this.zone3.updatePortalDisplay(e,t)}_updateChoreography(e,t){let{zoneWeights:n}=this.state,i=this.isMobile,a=(e,t,n=-3)=>{let r=t>.015;if(e.visible=r,!r)return;let i=t*t*(3-2*t),a=.86+i*.14;e.scale.setScalar(a),e.position.y=(1-i)*n};a(this.zone1.group,n.z1,-2.4),this.zone1.group.visible&&(this.zone1.setRiseProgress(this.state.z1Rise),this.state.orbitAutoSpin&&(this.state.orbitTargetYaw+=t*.11),this.state.orbitYaw=r.lerp(this.state.orbitYaw,this.state.orbitTargetYaw,Math.min(1,t*6)),this.state.orbitPitch=r.lerp(this.state.orbitPitch,this.state.orbitTargetPitch,Math.min(1,t*6)),this.zone1.group.rotation.y=this.state.orbitYaw,this.zone1.group.rotation.x=(this.state.orbitPitch-.24)*.45),a(this.zone2.group,n.z2,-2.2),this.zone2.group.visible&&(this.zone2.setExplosionProgress(this.state.z2Explode),this.zone2.group.rotation.y=-.55+this.state.z2Explode*.42+this.state.pointerX*.08),a(this.zone3.group,n.z3,-1.8),this.zone3.group.visible&&(this.zone3.setExplosionProgress(this.state.z3Explode),this.zone3.group.position.y+=Math.sin(e*1.15)*.05,this.zone3.group.rotation.y+=this.state.pointerX*.08),this.zone4.group.visible=n.z4>.02,this.zone4.group.visible&&(this.zone4.update(e),this.materials.ambientWireLine.opacity=.24*n.z4,this.materials.ambientGoldLine.opacity=.3*n.z4),a(this.zone5.group,n.z5,-1.2),this.zone5.group.visible&&(this.zone5.setReassemblyProgress(this.state.z5Reassemble),this.zone5.update(e,this.state.z5Reassemble));let o=Math.min(1,n.z1+n.z2*.65);this.datumFloor.group.visible=o>.02,this.datumFloor.group.visible&&(this.datumFloor.gridMat.opacity=.78*o,this.datumFloor.ringMatInner.opacity=.42*o,this.datumFloor.ringMatOuter.opacity=.35*o,this.datumFloor.group.position.y=-2.45-this.state.z2Explode*n.z2*2.15);let s={z1:{pos:i?[.4,3.2,16.5]:[7.8,3.9,13],target:i?[0,-1.65,0]:[-2.35,.68,0]},z2:{pos:i?[.4,2.3+this.state.z2Explode*.5,16.8+this.state.z2Explode*3]:[5.4,2.1+this.state.z2Explode*.4,12.2+this.state.z2Explode*3.6],target:i?[0,-1.55,0]:[.85,.15,0]},z3:{pos:i?[2.6,.8,11.4+this.state.z3Explode*2.2]:[4.2,.85,8.8+this.state.z3Explode*2.6],target:i?[0,-1.35,0]:[.95,0,0]},z4:{pos:[0,1.4,i?14.5:12.6],target:[0,.1,-2.2]},z5:{pos:i?[0,1.1,10.6]:[3.2,1,8.8],target:i?[0,-1.25,0]:[1.75,.05,0]}},c=Math.max(.001,n.z1+n.z2+n.z3+n.z4+n.z5);this.desiredCamPos.set(0,0,0),this.desiredCamTarget.set(0,0,0);for(let e of[`z1`,`z2`,`z3`,`z4`,`z5`]){let t=n[e]/c;t<=.001||(this.desiredCamPos.x+=s[e].pos[0]*t,this.desiredCamPos.y+=s[e].pos[1]*t,this.desiredCamPos.z+=s[e].pos[2]*t,this.desiredCamTarget.x+=s[e].target[0]*t,this.desiredCamTarget.y+=s[e].target[1]*t,this.desiredCamTarget.z+=s[e].target[2]*t)}i||(this.desiredCamPos.x+=this.state.pointerX*.24,this.desiredCamPos.y-=this.state.pointerY*.14);let l=Math.min(1,t*5.2);this.camPos.lerp(this.desiredCamPos,l),this.camTarget.lerp(this.desiredCamTarget,l),this.camera.position.copy(this.camPos),this.camera.lookAt(this.camTarget)}_project3DAnchors(){if(!this.onProjectAnchors)return;let e=e=>{this.tempVec.copy(e).project(this.camera);let t=this.tempVec.z<1&&this.tempVec.z>-1;return{x:(this.tempVec.x*.5+.5)*this.width,y:(-this.tempVec.y*.5+.5)*this.height,visible:t}},t={z2Weight:this.state.zoneWeights.z2,z2Explode:this.state.z2Explode,z3Weight:this.state.zoneWeights.z3,z3Explode:this.state.z3Explode,z2Pins:[],z3Callouts:[]};this.state.zoneWeights.z2>.15&&Q.forEach(n=>{let r=this.zone2.getAnchorWorldPosition(n.layerKey,new o);if(r){let i=e(r);t.z2Pins.push({id:n.id,code:n.code,label:n.calloutLabel,layerKey:n.layerKey,...i})}}),this.state.zoneWeights.z3>.15&&me.forEach(n=>{let r=this.zone3.getAnchorWorldPosition(n.layerKey,new o);if(r){let i=e(r);t.z3Callouts.push({id:n.id,label:n.label,...i})}}),this.onProjectAnchors(t)}start(){if(this.rafId!==null)return;let e=0,t=n=>{if(this.rafId=requestAnimationFrame(t),this.isSoftwareGPU&&n-e<85)return;e=n;let r=Math.min(this.clock.getDelta(),.05),i=this.clock.elapsedTime;this._updateChoreography(i,r),this.composer.render(),this._project3DAnchors()};t(0)}destroy(){this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),window.removeEventListener(`resize`,this._handleResize),window.removeEventListener(`pointermove`,this._handlePointerMove),this.renderer.dispose()}};W.registerPlugin(U);function Te(e,{onZoneChange:t,onScrollPercent:n}={}){let r=new re({duration:1.2,easing:e=>Math.min(1,1.001-2**(-10*e)),orientation:`vertical`,gestureOrientation:`vertical`,smoothWheel:!0,wheelMultiplier:.95,touchMultiplier:1.45});r.on(`scroll`,U.update),W.ticker.add(e=>{r.raf(e*1e3)}),W.ticker.lagSmoothing(0);let i=document.getElementById(`z2-scrub-fill`),a=document.getElementById(`z2-scrub-readout`),o=document.getElementById(`z3-scrub-fill`),s=document.getElementById(`z3-scrub-readout`),c=document.getElementById(`z5-scrub-fill`),l=document.getElementById(`z5-scrub-readout`),u=[{id:1,key:`z1`,el:document.getElementById(`zone-hero`)},{id:2,key:`z2`,el:document.getElementById(`zone-structural`)},{id:3,key:`z3`,el:document.getElementById(`zone-hardware`)},{id:4,key:`z4`,el:document.getElementById(`zone-estimator`)},{id:5,key:`z5`,el:document.getElementById(`zone-engage`)}];function d(){let r=window.innerHeight,i=r*.5,a=1,o=-1;u.forEach(t=>{if(!t.el)return;let n=t.el.getBoundingClientRect(),s=0;n.top<=i&&n.bottom>=i?s=1:n.top>i&&n.top<r*1.15?s=1-(n.top-i)/(r*.65):n.bottom<i&&n.bottom>-r*.15&&(s=1-(i-n.bottom)/(r*.65)),s=Math.max(0,Math.min(1,s)),e.state.zoneWeights[t.key]=s,s>o&&(o=s,a=t.id)}),e.state.activeZone!==a&&(e.state.activeZone=a,t?.(a));let s=Math.max(1,document.documentElement.scrollHeight-window.innerHeight),c=Math.min(100,Math.max(0,Math.round(window.scrollY/s*100)));n?.(c)}U.create({trigger:document.body,start:`top top`,end:`bottom bottom`,onUpdate:d});let f={val:0};W.to(f,{val:1,ease:`none`,onUpdate:()=>{e.state.z2Explode=f.val;let t=Math.round(f.val*100);i&&(i.style.width=`${t}%`),a&&(a.textContent=`${String(t).padStart(2,`0`)}%`)},scrollTrigger:{trigger:`#zone-structural`,start:`top 65%`,end:`bottom 85%`,scrub:1.2}});let p={val:0};W.to(p,{val:1,ease:`none`,onUpdate:()=>{e.state.z3Explode=p.val;let t=Math.round(p.val*100);o&&(o.style.width=`${t}%`),s&&(s.textContent=`${String(t).padStart(2,`0`)}%`)},scrollTrigger:{trigger:`#zone-hardware`,start:`top 65%`,end:`bottom 85%`,scrub:1.2}});let m={val:0};return W.to(m,{val:1,ease:`none`,onUpdate:()=>{e.state.z5Reassemble=m.val;let t=Math.round(m.val*100);c&&(c.style.width=`${t}%`),l&&(l.textContent=`${String(t).padStart(2,`0`)}%`)},scrollTrigger:{trigger:`#zone-engage`,start:`top 80%`,end:`bottom 115%`,scrub:1.2}}),d(),{lenis:r,scrollToTarget(e){let t=document.querySelector(e);t&&r.scrollTo(t,{offset:e===`#zone-hero`?0:-12,duration:1.35})},refresh(){U.refresh(),d()}}}function Ee(e){let t=document.getElementById(`lighting-toggle-group`),n=document.getElementById(`lighting-mode-code`),r=document.getElementById(`lighting-mode-desc`),i=document.getElementById(`nav-lighting-badge`),a=document.getElementById(`hero-orbit-surface`),o=document.getElementById(`orbit-reset-btn`),s=`night`;function c(a,o=!0){let c=pe.find(e=>e.id===a)||pe[0];s=c.id,o&&e.setLightingMode(c.id),n&&(n.textContent=c.code),r&&(r.textContent=c.description),i&&(i.textContent=c.shortLabel.toUpperCase()),t&&t.querySelectorAll(`.seg-btn`).forEach(e=>{let t=e.dataset.mode===c.id;e.classList.toggle(`is-active`,t),e.setAttribute(`aria-checked`,String(t))})}return t&&(t.innerHTML=pe.map(e=>`
        <button
          type="button"
          class="seg-btn ${e.id===s?`is-active`:``}"
          role="radio"
          aria-checked="${e.id===s}"
          data-mode="${e.id}"
          id="lighting-btn-${e.id}"
        >
          ${e.label}
        </button>
      `).join(``),t.addEventListener(`click`,e=>{let t=e.target.closest(`.seg-btn`);t&&c(t.dataset.mode,!0)})),a&&e.attachOrbitSurface(a),o&&o.addEventListener(`click`,t=>{t.stopPropagation(),e.resetOrbit()}),c(`night`,!1),{selectMode:c}}function De(e){let t=document.getElementById(`callout-svg`),n=document.getElementById(`hotspot-layer`),r=document.getElementById(`zone2-spec-card`),i=`mepCore`,a=!1,o=new Map;n&&(n.innerHTML=``,Q.forEach(e=>{let t=document.createElement(`button`);t.type=`button`,t.className=`hotspot-pin`,t.id=`hotspot-pin-${e.id}`,t.dataset.hotspotId=e.id,t.setAttribute(`aria-label`,`Inspect ${e.title}`),t.textContent=e.code,t.style.opacity=`0`,t.style.pointerEvents=`none`,t.addEventListener(`click`,()=>{c(e.id)}),n.appendChild(t),o.set(e.id,t)}));function s(){if(!r)return;let t=Q.find(e=>e.id===i)||Q[0],n=Q[(Q.findIndex(e=>e.id===t.id)+1)%Q.length];r.innerHTML=`
      <div class="spec-layer-selector" role="tablist" aria-label="Structural building layers">
        ${Q.map(e=>`
            <button
              type="button"
              role="tab"
              aria-selected="${e.id===t.id}"
              class="layer-pill-btn ${e.id===t.id?`is-active`:``}"
              data-spec-select="${e.id}"
              id="layer-pill-${e.id}"
            >
              ${e.code}
            </button>
          `).join(``)}
      </div>

      <div class="spec-drawer-head">
        <span class="mono-accent">${t.calloutLabel}</span>
        <h3 class="spec-drawer-title">${t.title}</h3>
        <div class="spec-csi">${t.csiDivision}</div>
      </div>

      <div class="spec-metrics-grid">
        <div class="spec-metric-box">
          <span class="mono-label">SQUARE FOOTAGE / SCALE</span>
          <strong>${t.sqft}</strong>
        </div>
        <div class="spec-metric-box">
          <span class="mono-label">LEASE &amp; PROCUREMENT STATUS</span>
          <strong>${t.leaseStatus}</strong>
        </div>
        <div class="spec-metric-box">
          <span class="mono-label">BUILD COST / SQFT</span>
          <strong>${t.buildCost}</strong>
          <small>${t.costContext}</small>
        </div>
      </div>

      <ul class="spec-highlights">
        ${t.highlights.map(e=>`<li>${e}</li>`).join(``)}
      </ul>

      <div class="spec-drawer-actions">
        <button
          type="button"
          id="isolate-layer-btn"
          class="isolate-toggle-btn ${a?`is-active`:``}"
          aria-pressed="${a}"
        >
          <span>${a?`◉ LAYER ISOLATED`:`◎ ISOLATE 3D LAYER`}</span>
        </button>
        <button type="button" id="next-layer-btn" class="btn btn-ghost btn-sm" data-next="${n.id}">
          Next (${n.code}) →
        </button>
      </div>
    `,r.querySelectorAll(`[data-spec-select]`).forEach(e=>{e.addEventListener(`click`,()=>c(e.dataset.specSelect))});let o=r.querySelector(`#isolate-layer-btn`);o&&o.addEventListener(`click`,()=>{a=!a,e.setZone2Hotspot(t.layerKey,a),s()});let l=r.querySelector(`#next-layer-btn`);l&&l.addEventListener(`click`,()=>c(l.dataset.next))}function c(t){let n=Q.find(e=>e.id===t);n&&(i=n.id,e.setZone2Hotspot(n.layerKey,a),o.forEach((e,t)=>{e.classList.toggle(`is-active`,t===i)}),s())}function l(e,t,n,r=28){let i=[...e].sort((e,t)=>e.y-t.y),a=new Map,o=t-r;return i.forEach(e=>{let i=Math.max(t,Math.min(n,e.y));i<o+r&&(i=o+r),o=i,a.set(e.id,i)}),a}return e.onProjectAnchors=e=>{let n=window.innerWidth<1024,r=window.innerWidth,a=window.innerHeight,s=e.z2Weight>.25?Math.min(1,(e.z2Weight-.25)/.35)*Math.min(1,.35+e.z2Explode*1.1):0;if(s<=.02||e.z2Pins.length===0?o.forEach(e=>{e.style.opacity=`0`,e.style.pointerEvents=`none`}):e.z2Pins.forEach(e=>{let t=o.get(e.id);if(!t)return;let i=n?r-22:r-455,c=n?a*.49:a-40;e.visible&&e.x>24&&e.x<i&&e.y>76&&e.y<c?(t.style.transform=`translate3d(${e.x.toFixed(1)}px, ${e.y.toFixed(1)}px, 0)`,t.style.opacity=s.toFixed(2),t.style.pointerEvents=`auto`):(t.style.opacity=`0`,t.style.pointerEvents=`none`)}),!t)return;if(n){t.innerHTML!==``&&(t.innerHTML=``);return}let c=[],u=e.z2Weight>.32&&e.z2Explode>.14?Math.min(1,(e.z2Weight-.32)/.35)*Math.min(1,(e.z2Explode-.14)/.3):0;if(u>.04&&e.z2Pins.length>0){let t=e.z2Pins.filter(e=>e.visible&&e.x>40&&e.x<r-460&&e.y>105&&e.y<a-60),n=l(t,315,a-95,34);t.forEach(e=>{let t=n.get(e.id)??e.y,r=e.id===i,a=Math.max(247,e.x-42),o=r?`is-active`:``;c.push(`
          <g opacity="${u.toFixed(2)}">
            <polyline class="callout-polyline ${o}" points="${e.x.toFixed(1)},${e.y.toFixed(1)} ${a.toFixed(1)},${t.toFixed(1)} ${230 .toFixed(1)},${t.toFixed(1)}" />
            <circle class="callout-dot ${o}" cx="${e.x.toFixed(1)}" cy="${e.y.toFixed(1)}" r="${r?3.8:2.6}" />
            <text class="callout-text ${o}" x="42" y="${(t+3.5).toFixed(1)}">${e.label}</text>
          </g>
        `)})}let d=e.z3Weight>.32&&e.z3Explode>.15?Math.min(1,(e.z3Weight-.32)/.35)*Math.min(1,(e.z3Explode-.15)/.3):0;if(d>.04&&e.z3Callouts.length>0){let t=e.z3Callouts.filter(e=>e.visible&&e.x>40&&e.x<r-520&&e.y>110&&e.y<a-60),n=l(t,305,a-95,34);t.forEach(e=>{let t=n.get(e.id)??e.y,r=Math.max(237,e.x-36);c.push(`
          <g opacity="${d.toFixed(2)}">
            <polyline class="callout-polyline" points="${e.x.toFixed(1)},${e.y.toFixed(1)} ${r.toFixed(1)},${t.toFixed(1)} ${224 .toFixed(1)},${t.toFixed(1)}" />
            <circle class="callout-dot" cx="${e.x.toFixed(1)}" cy="${e.y.toFixed(1)}" r="2.8" />
            <text class="callout-text" x="42" y="${(t+3.5).toFixed(1)}">${e.label}</text>
          </g>
        `)})}t.innerHTML=c.join(``)},c(i),{selectHotspot:c}}function Oe(e,{onShowToast:t,onOpenBooking:n}={}){let r=document.getElementById(`zone3-portal-card`);if(!r)return;let i={activeTab:`investor`,scenario:`base`,suiteId:`L21`};function a(){e.updateKioskPortalScreen(i.activeTab,{scenario:i.scenario,suiteId:i.suiteId})}function o(){let e=$.investor.scenarios[i.scenario];return`
      <div class="scenario-row" role="radiogroup" aria-label="Financial underwriting scenario">
        ${Object.entries($.investor.scenarios).map(([e,t])=>`
              <button
                type="button"
                class="scenario-btn ${i.scenario===e?`is-active`:``}"
                data-scenario="${e}"
                id="portal-scenario-${e}"
              >
                ${t.label}
              </button>
            `).join(``)}
      </div>

      <div class="kpi-grid-2">
        <div class="kpi-tile">
          <span class="mono-label">PROJECTED NET IRR</span>
          <div class="kpi-value accent-amber">${e.irr}</div>
        </div>
        <div class="kpi-tile">
          <span class="mono-label">EQUITY MULTIPLE</span>
          <div class="kpi-value">${e.equityMultiple}</div>
        </div>
        <div class="kpi-tile">
          <span class="mono-label">YIELD ON COST</span>
          <div class="kpi-value accent-cyan">${e.yieldOnCost}</div>
        </div>
        <div class="kpi-tile">
          <span class="mono-label">STABILIZED NOI</span>
          <div class="kpi-value">${e.stabilizedNoi}</div>
        </div>
      </div>

      <div class="stack-bars">
        <span class="mono-label">CAPITAL STACK · $168.0M TOTAL CAPITALIZATION</span>
        ${e.capitalStack.map(e=>`
              <div class="stack-bar-item">
                <div class="stack-bar-meta">
                  <span>${e.label}</span>
                  <strong>${e.amount} · ${e.pct}%</strong>
                </div>
                <div class="bar-track">
                  <div class="bar-fill tone-${e.tone}" style="width:${e.pct}%"></div>
                </div>
              </div>
            `).join(``)}
      </div>

      <p class="panel-micro-desc">${e.note}</p>
    `}function s(){let e=$.tenant.suites,t=e.find(e=>e.id===i.suiteId)||e[0];return`
      <div class="suite-list" role="listbox" aria-label="Available building suites">
        ${e.map(e=>`
              <button
                type="button"
                role="option"
                aria-selected="${e.id===t.id}"
                class="suite-row ${e.id===t.id?`is-active`:``}"
                data-suite="${e.id}"
                id="portal-suite-${e.id}"
              >
                <div class="suite-row-main">
                  <strong>${e.floor} · ${e.suite}</strong>
                  <span>${e.rsf} · ${e.rate}</span>
                </div>
                <span class="suite-status-tag tag-${e.statusTone}">${e.status}</span>
              </button>
            `).join(``)}
      </div>

      <div class="suite-detail-box">
        <div class="panel-header-row" style="margin-bottom:4px">
          <span class="mono-cyan">${t.suite.toUpperCase()}</span>
          <span class="mono-label">${t.delivery}</span>
        </div>
        <div class="suite-detail-grid">
          <div><span class="mono-label">TI ALLOWANCE</span><strong>${t.tiAllowance}</strong></div>
          <div><span class="mono-label">EXPOSURE</span><strong>${t.exposure}</strong></div>
        </div>
        <button type="button" id="portal-tour-btn" class="btn btn-ghost btn-sm btn-full">
          Request Private 3D Broker Tour for ${t.suite}
        </button>
      </div>
    `}function c(){let{summary:e,milestones:t}=$.site;return`
      <div class="site-summary-strip">
        <div>
          <span class="mono-label">OVERALL GMP COMPLETION</span>
          <div class="site-summary-pct">${e.overallPct}%</div>
        </div>
        <div style="text-align:right">
          <div class="mono-cyan" style="color:var(--emerald)">${e.daysAhead}</div>
          <div class="mono-label" style="margin-top:4px">${e.gmpVariance}</div>
        </div>
      </div>

      <div class="kpi-grid-2">
        <div class="kpi-tile">
          <span class="mono-label">OPEN FIELD RFIs</span>
          <div class="kpi-value">${e.openRfis}</div>
        </div>
        <div class="kpi-tile">
          <span class="mono-label">SAFETY RECORD</span>
          <div class="kpi-value" style="font-size:1.1rem;padding-top:6px">${e.safetyDays}</div>
        </div>
      </div>

      <div class="milestone-list">
        ${t.map(e=>`
              <div class="milestone-item">
                <div class="milestone-top">
                  <span>${e.phase}</span>
                  <strong class="mono-accent">${e.pct}%</strong>
                </div>
                <div class="bar-track">
                  <div class="bar-fill ${e.pct===100?`tone-emerald`:`tone-cyan`}" style="width:${e.pct}%"></div>
                </div>
                <div class="milestone-sub">
                  <span>${e.status}</span>
                  <span>${e.date}</span>
                </div>
              </div>
            `).join(``)}
      </div>
    `}function l(){let e=[{id:`investor`,label:$.investor.tabLabel},{id:`tenant`,label:$.tenant.tabLabel},{id:`site`,label:$.site.tabLabel}],u=i.activeTab===`investor`?o():i.activeTab===`tenant`?s():c();r.innerHTML=`
      <div class="portal-tabs" role="tablist" aria-label="Smart building executive portal views">
        ${e.map(e=>`
              <button
                type="button"
                role="tab"
                aria-selected="${i.activeTab===e.id}"
                class="portal-tab-btn ${i.activeTab===e.id?`is-active`:``}"
                data-portal-tab="${e.id}"
                id="portal-tab-${e.id}"
              >
                ${e.label}
              </button>
            `).join(``)}
      </div>

      <div class="portal-sync-bar">
        <span class="mono-cyan">● 3D KIOSK OLED LIVE-SYNCED</span>
        <span class="mono-label">${$[i.activeTab].shortLabel.toUpperCase()}</span>
      </div>

      ${u}
    `,r.querySelectorAll(`[data-portal-tab]`).forEach(e=>{e.addEventListener(`click`,()=>{i.activeTab=e.dataset.portalTab,a(),l()})}),r.querySelectorAll(`[data-scenario]`).forEach(e=>{e.addEventListener(`click`,()=>{i.scenario=e.dataset.scenario,a(),l()})}),r.querySelectorAll(`[data-suite]`).forEach(e=>{e.addEventListener(`click`,()=>{i.suiteId=e.dataset.suite,a(),l()})});let d=r.querySelector(`#portal-tour-btn`);d&&d.addEventListener(`click`,()=>{let e=$.tenant.suites.find(e=>e.id===i.suiteId);t?.(`Tour brief prepared for ${e?.suite||`selected suite`}`),n?.({customNote:`Requesting interactive 3D leasing portal demo modeled after ${e?.suite} (${e?.rsf}).`})})}return a(),l(),{setTab(e){$[e]&&(i.activeTab=e,a(),l())}}}function ke({onShowToast:e,onSendBriefToEngage:t}={}){let n=document.getElementById(`estimator-app-root`);if(!n)return;let r={projectTypeId:`mixed-use`,sqft:185e3,timelineId:`standard`,activeModules:new Set(_e.filter(e=>e.defaultOn).map(e=>e.id))},i=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`,maximumFractionDigits:0}),a=new Intl.NumberFormat(`en-US`);function o(e){return e>=1e6?`$${(e/1e6).toFixed(2)}M`:`$${Math.round(e/1e3)}K`}function s(){let e=he.find(e=>e.id===r.projectTypeId)||he[0],t=ge.find(e=>e.id===r.timelineId)||ge[1],n=0,i=0,a=0,o=1,s=[];_e.forEach(e=>{r.activeModules.has(e.id)&&(n+=e.costAdd,i+=e.weeksAdd,a+=e.hoursAdd,o*=e.valueBoost,s.push(e))});let c=r.sqft*e.sqftFactor,l=(e.baseCost+c+n)*t.multiplier,u=Math.round(l*.88/1e3)*1e3,d=Math.round(l*1.14/1e3)*1e3,f=r.sqft/1e5,p=Math.round(f*e.carryMonthlyPer100k*e.leaseAccelerationMonths*.42*o),m=Math.round(e.hoursSavedBase+a+r.sqft/5e4*32),h=Math.max(3.5,Number(((e.baseWeeks+i+(r.sqft>35e4?1.2:0))*t.weekFactor).toFixed(1))),g=r.activeModules.has(`twin3d`)?46:28,_=r.activeModules.has(`aiIntake`)?26:16;return{project:e,timeline:t,selectedModules:s,investLow:u,investHigh:d,acceleratedCarrySavings:p,hoursSavedAnnual:m,targetWeeks:h,alloc:{pct3D:g,pctInteractive:100-g-_,pctAI:_}}}function c(e){let t=new Date().toISOString().split(`T`)[0],n=e.selectedModules.length>0?e.selectedModules.map(e=>`- ${e.label}`).join(`
`):`- Core Executive Digital Platform`;return`# ${Z.brandName} — EXECUTIVE PROJECT SCOPE & ROI BRIEF
Generated: ${t}

## 1. Asset & Project Parameters
- Project Category: ${e.project.label}
- Gross Building Scale: ${a.format(r.sqft)} GSF
- Delivery Cadence: ${e.timeline.label} (${e.timeline.badge})

## 2. Selected Interactive & Automation Modules
${n}

## 3. Projected Investment & Preconstruction ROI
- Estimated Studio Investment: ${i.format(e.investLow)} – ${i.format(e.investHigh)}
- Projected Carry / Pre-Leasing Acceleration Value: +${o(e.acceleratedCarrySavings)}
- Executive & Preconstruction Hours Saved / Yr: ${a.format(e.hoursSavedAnnual)} hrs
- Target Production Launch Window: ${e.targetWeeks} Weeks

## 4. Recommended Architectural Focus
${e.project.deliverableFocus}

---
Prepared via ${Z.brandName} Interactive Scope Engine (${Z.contactEmail})
`}function l(){let e=s(),t=(e,t)=>{let n=document.getElementById(e);n&&(n.textContent=t)};t(`est-sqft-readout`,`${a.format(r.sqft)} GSF`),t(`est-price-range`,`${i.format(e.investLow)} – ${i.format(e.investHigh)}`),t(`est-timeline-badge`,`${e.timeline.badge} · Target Launch: ${e.targetWeeks} Weeks`),t(`est-carry-savings`,`+${o(e.acceleratedCarrySavings)}`),t(`est-hours-saved`,`${a.format(e.hoursSavedAnnual)} hrs/yr`),t(`est-weeks-out`,`${e.targetWeeks} Wks`),t(`est-roi-multiple`,`${(e.acceleratedCarrySavings/Math.max(1,e.investHigh)).toFixed(1)}x Value Ratio`),t(`est-focus-text`,e.project.deliverableFocus);let c=document.getElementById(`est-alloc-1`),l=document.getElementById(`est-alloc-2`),u=document.getElementById(`est-alloc-3`);c&&(c.style.width=`${e.alloc.pct3D}%`),l&&(l.style.width=`${e.alloc.pctInteractive}%`),u&&(u.style.width=`${e.alloc.pctAI}%`),t(`est-legend-1`,`3D WebGL ${e.alloc.pct3D}%`),t(`est-legend-2`,`Portal & UX ${e.alloc.pctInteractive}%`),t(`est-legend-3`,`AI & QA ${e.alloc.pctAI}%`),n.querySelectorAll(`[data-sqft-preset]`).forEach(e=>{e.classList.toggle(`is-active`,Number(e.dataset.sqftPreset)===r.sqft)})}function u(){n.innerHTML=`
      <!-- Left: Interactive Configuration Inputs -->
      <div class="estimator-inputs-card surface-glass">
        <div class="est-section">
          <div class="est-section-head">
            <span class="mono-label">01 // SELECT PROJECT TYPE</span>
            <span class="mono-accent">COMMERCIAL BENCHMARK</span>
          </div>
          <div class="project-type-grid" role="radiogroup" aria-label="Project type">
            ${he.map(e=>`
                <button
                  type="button"
                  role="radio"
                  aria-checked="${r.projectTypeId===e.id}"
                  class="type-option-card ${r.projectTypeId===e.id?`is-active`:``}"
                  data-project-type="${e.id}"
                  id="est-type-${e.id}"
                >
                  <strong>${e.label}</strong>
                  <span>Base ${o(e.baseCost)} · ${e.baseWeeks} wks</span>
                </button>
              `).join(``)}
          </div>
        </div>

        <div class="est-section">
          <div class="est-section-head">
            <label for="est-sqft-slider" class="mono-label">02 // GROSS SQUARE FOOTAGE / ASSET SCALE</label>
            <span id="est-sqft-readout" class="sqft-display-value">${a.format(r.sqft)} GSF</span>
          </div>
          <input
            type="range"
            id="est-sqft-slider"
            class="range-slider"
            min="25000"
            max="750000"
            step="5000"
            value="${r.sqft}"
          />
          <div class="preset-row">
            ${[35e3,12e4,185e3,35e4,6e5].map(e=>`
                  <button
                    type="button"
                    class="preset-chip ${r.sqft===e?`is-active`:``}"
                    data-sqft-preset="${e}"
                  >
                    ${e/1e3}K SF
                  </button>
                `).join(``)}
          </div>
        </div>

        <div class="est-section">
          <div class="est-section-head">
            <span class="mono-label">03 // TARGET LAUNCH TIMELINE</span>
          </div>
          <div class="segmented-control" role="radiogroup" aria-label="Target timeline">
            ${ge.map(e=>`
                <button
                  type="button"
                  role="radio"
                  aria-checked="${r.timelineId===e.id}"
                  class="seg-btn ${r.timelineId===e.id?`is-active`:``}"
                  data-timeline="${e.id}"
                  id="est-timeline-${e.id}"
                >
                  ${e.label}
                </button>
              `).join(``)}
          </div>
        </div>

        <div class="est-section">
          <div class="est-section-head">
            <span class="mono-label">04 // INTERACTIVE CAPABILITY MODULES</span>
            <span class="mono-label">MULTI-SELECT</span>
          </div>
          <div class="module-check-grid">
            ${_e.map(e=>{let t=r.activeModules.has(e.id);return`
                <button
                  type="button"
                  class="module-toggle-row ${t?`is-active`:``}"
                  aria-pressed="${t}"
                  data-module-id="${e.id}"
                  id="est-mod-${e.id}"
                >
                  <span class="module-toggle-left">
                    <span class="check-box">${t?`✓`:``}</span>
                    <span>${e.label}</span>
                  </span>
                  <span class="module-cost-tag">+${o(e.costAdd)}</span>
                </button>
              `}).join(``)}
          </div>
        </div>
      </div>

      <!-- Right: Live Executive Output & Brief Export Card -->
      <div class="estimator-output-card surface-glass" aria-live="polite">
        <div class="output-hero-metric">
          <span class="mono-accent">LIVE STUDIO INVESTMENT ESTIMATE</span>
          <div id="est-price-range" class="output-price-range"></div>
          <div id="est-timeline-badge" class="mono-label"></div>
        </div>

        <div class="output-roi-grid">
          <div class="roi-box">
            <span class="mono-label">PROJECTED CARRY / LEASE VALUE</span>
            <div id="est-carry-savings" class="roi-box-value positive"></div>
          </div>
          <div class="roi-box">
            <span class="mono-label">PRECON HOURS SAVED</span>
            <div id="est-hours-saved" class="roi-box-value cyan"></div>
          </div>
          <div class="roi-box">
            <span class="mono-label">ESTIMATED DELIVERY</span>
            <div id="est-weeks-out" class="roi-box-value"></div>
          </div>
          <div class="roi-box">
            <span class="mono-label">PROJECTED IMPACT RATIO</span>
            <div id="est-roi-multiple" class="roi-box-value" style="color:var(--amber-bright)"></div>
          </div>
        </div>

        <div>
          <span class="mono-label">ENGINEERING EFFORT ALLOCATION</span>
          <div class="allocation-bar">
            <div id="est-alloc-1" class="alloc-seg-1"></div>
            <div id="est-alloc-2" class="alloc-seg-2"></div>
            <div id="est-alloc-3" class="alloc-seg-3"></div>
          </div>
          <div class="allocation-legend">
            <span id="est-legend-1"></span>
            <span id="est-legend-2"></span>
            <span id="est-legend-3"></span>
          </div>
        </div>

        <div class="brief-focus-box">
          <span class="mono-label" style="display:block;margin-bottom:5px">RECOMMENDED ARCHITECTURE</span>
          <span id="est-focus-text"></span>
        </div>

        <div class="output-actions">
          <div class="output-actions-row">
            <button type="button" id="est-copy-brief-btn" class="btn btn-ghost">
              Copy Executive Brief
            </button>
            <button type="button" id="est-download-brief-btn" class="btn btn-ghost">
              Download Brief (.md)
            </button>
          </div>
          <button type="button" id="est-send-engage-btn" class="btn btn-amber btn-full">
            Lock Scope &amp; Configure Studio Engagement →
          </button>
        </div>
      </div>
    `,n.querySelectorAll(`[data-project-type]`).forEach(e=>{e.addEventListener(`click`,()=>{r.projectTypeId=e.dataset.projectType,n.querySelectorAll(`[data-project-type]`).forEach(e=>{let t=e.dataset.projectType===r.projectTypeId;e.classList.toggle(`is-active`,t),e.setAttribute(`aria-checked`,String(t))}),l()})});let u=n.querySelector(`#est-sqft-slider`);u&&u.addEventListener(`input`,e=>{r.sqft=Number(e.target.value),l()}),n.querySelectorAll(`[data-sqft-preset]`).forEach(e=>{e.addEventListener(`click`,()=>{r.sqft=Number(e.dataset.sqftPreset),u&&(u.value=String(r.sqft)),l()})}),n.querySelectorAll(`[data-timeline]`).forEach(e=>{e.addEventListener(`click`,()=>{r.timelineId=e.dataset.timeline,n.querySelectorAll(`[data-timeline]`).forEach(e=>{let t=e.dataset.timeline===r.timelineId;e.classList.toggle(`is-active`,t),e.setAttribute(`aria-checked`,String(t))}),l()})}),n.querySelectorAll(`[data-module-id]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.moduleId;r.activeModules.has(t)?r.activeModules.delete(t):r.activeModules.add(t);let n=r.activeModules.has(t);e.classList.toggle(`is-active`,n),e.setAttribute(`aria-pressed`,String(n));let i=e.querySelector(`.check-box`);i&&(i.textContent=n?`✓`:``),l()})}),n.querySelector(`#est-copy-brief-btn`)?.addEventListener(`click`,async()=>{let t=c(s());try{await navigator.clipboard.writeText(t),e?.(`Executive Project Scope Brief copied to clipboard.`)}catch{let n=document.createElement(`textarea`);n.value=t,n.style.position=`fixed`,n.style.opacity=`0`,document.body.appendChild(n),n.select(),document.execCommand(`copy`),document.body.removeChild(n),e?.(`Executive Project Scope Brief copied to clipboard.`)}}),n.querySelector(`#est-download-brief-btn`)?.addEventListener(`click`,()=>{let t=s(),n=c(t),r=new Blob([n],{type:`text/markdown;charset=utf-8`}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=`${Z.brandShort.toLowerCase()}-scope-brief-${t.project.id}.md`,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i),e?.(`Downloaded Executive Scope Brief (.md).`)}),n.querySelector(`#est-send-engage-btn`)?.addEventListener(`click`,()=>{let e=s(),n=`${e.project.label} · ${a.format(r.sqft)} GSF · Est. ${i.format(e.investLow)}–${i.format(e.investHigh)} (${e.targetWeeks} wks)`;t?.({summary:n,recommendedTierId:r.activeModules.has(`aiIntake`)&&!r.activeModules.has(`twin3d`)?`workflow`:`flagship`})}),l()}return u(),{getCurrentEstimate:s}}function Ae({onShowToast:e}={}){let t=document.getElementById(`zone5-configurator-root`),n=document.getElementById(`booking-modal`),r=document.getElementById(`booking-modal-body`),i=document.getElementById(`booking-modal-close`),a={selectedTierId:`flagship`,selectedAddons:new Set,attachedScopeSummary:``,bookingSlot:`Tomorrow · 10:00 AM ET`,bookingConfirmed:!1,lastConfirmation:null},o=new Intl.NumberFormat(`en-US`,{style:`currency`,currency:`USD`,maximumFractionDigits:0});function s(){let e=ve.find(e=>e.id===a.selectedTierId)||ve[1],t=0,n=0,r=[];ye.forEach(e=>{a.selectedAddons.has(e.id)&&(t+=e.costAdd,n+=e.daysAdd,r.push(e))});let i=e.priceLow+t,s=e.priceHigh+t,c=i===s?`${o.format(i)} Fixed`:`${o.format(i)} – ${o.format(s)}`,l=e.turnaroundLabel;return n>0&&(l=e.id===`prototype`?`${e.turnaroundDays+n} Days`:`~${Math.round((e.turnaroundDays+n)/7*2)/2} Weeks`),{tier:e,addons:r,low:i,high:s,priceText:c,turnaroundText:l}}function c(){if(!t)return;let e=s();t.innerHTML=`
      <div class="panel-header-row" style="margin-bottom:0">
        <span class="mono-label">SELECT ENGAGEMENT ARCHITECTURE</span>
        <span class="mono-accent">${e.tier.code}</span>
      </div>

      ${a.attachedScopeSummary?`<div class="booking-context-pill">
               <span class="mono-accent" style="display:block;margin-bottom:3px">ATTACHED SCOPE BRIEF FROM ESTIMATOR</span>
               ${a.attachedScopeSummary}
             </div>`:``}

      <div class="tier-cards-grid" role="radiogroup" aria-label="Studio engagement package">
        ${ve.map(e=>`
            <button
              type="button"
              role="radio"
              aria-checked="${e.id===a.selectedTierId}"
              class="tier-btn-card ${e.id===a.selectedTierId?`is-active`:``}"
              data-tier-id="${e.id}"
              id="engage-tier-${e.id}"
            >
              <span class="tier-code">${e.code}</span>
              <span class="tier-name">${e.name}</span>
              <span class="tier-price">${e.priceDisplay} · ${e.turnaroundLabel}</span>
            </button>
          `).join(``)}
      </div>

      <div class="tier-detail-panel">
        <div class="tier-summary-top">
          <div>
            <h3 style="font-family:var(--font-display);font-size:1.25rem;font-weight:600">${e.tier.name}</h3>
            <p style="font-size:12.5px;color:var(--ink-secondary);margin-top:3px">${e.tier.idealFor}</p>
          </div>
          <div class="tier-turnaround-badge">
            <span class="mono-label">EST. TURNAROUND</span>
            <strong id="engage-turnaround-val">${e.turnaroundText}</strong>
          </div>
        </div>

        <ul class="spec-highlights">
          ${e.tier.deliverables.map(e=>`<li>${e}</li>`).join(``)}
        </ul>
      </div>

      <div>
        <span class="mono-label" style="display:block;margin-bottom:9px">OPTIONAL STUDIO ACCELERATORS</span>
        <div class="addon-chips-row">
          ${ye.map(e=>{let t=a.selectedAddons.has(e.id);return`
              <button
                type="button"
                class="addon-chip ${t?`is-active`:``}"
                aria-pressed="${t}"
                data-addon-id="${e.id}"
                id="engage-addon-${e.id}"
              >
                ${t?`✓ `:`+ `}${e.label} (${o.format(e.costAdd)})
              </button>
            `}).join(``)}
        </div>
      </div>

      <div class="config-footer-row">
        <div class="config-total-readout">
          <span class="mono-label">CONFIGURED INVESTMENT</span>
          <strong id="engage-total-price">${e.priceText}</strong>
        </div>
        <button type="button" id="engage-open-booking-btn" class="btn btn-amber">
          Book Executive Discovery Call →
        </button>
      </div>
    `,t.querySelectorAll(`[data-tier-id]`).forEach(e=>{e.addEventListener(`click`,()=>{a.selectedTierId=e.dataset.tierId,c()})}),t.querySelectorAll(`[data-addon-id]`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.addonId;a.selectedAddons.has(t)?a.selectedAddons.delete(t):a.selectedAddons.add(t),c()})}),t.querySelector(`#engage-open-booking-btn`)?.addEventListener(`click`,()=>{d()})}function l(t){let n=new Date,r=new Date(n.getTime()+864e5);r.setHours(15,0,0,0);let i=new Date(r.getTime()+18e5),a=e=>e.toISOString().replace(/[-:]/g,``).split(`.`)[0]+`Z`,o=[`BEGIN:VCALENDAR`,`VERSION:2.0`,`PRODID:-//${Z.brandShort}//Booking//EN`,`BEGIN:VEVENT`,`UID:${t.refId}@northstarinteractive.studio`,`DTSTAMP:${a(n)}`,`DTSTART:${a(r)}`,`DTEND:${a(i)}`,`SUMMARY:${Z.brandName} — Executive Architecture Briefing (${t.packageName})`,`DESCRIPTION:Attendee: ${t.name} (${t.company})\\nPackage: ${t.packageName} (${t.priceText})\\nSlot: ${t.slot}\\nNotes: ${t.notes.replace(/\n/g,` `)}`,`END:VEVENT`,`END:VCALENDAR`].join(`\r
`),s=new Blob([o],{type:`text/calendar;charset=utf-8`}),c=URL.createObjectURL(s),l=document.createElement(`a`);l.href=c,l.download=`${Z.brandShort.toLowerCase()}-discovery-${t.refId}.ics`,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(c),e?.(`Calendar invite (.ics) downloaded.`)}function u(t=``){if(!r)return;let n=s(),i=[`Tomorrow · 10:00 AM ET`,`Tomorrow · 2:30 PM ET`,`Thu · 11:00 AM ET`];if(a.bookingConfirmed&&a.lastConfirmation){let e=a.lastConfirmation;r.innerHTML=`
        <div class="booking-confirmed">
          <span class="confirm-badge">✓ BRIEFING RESERVED · REF ${e.refId}</span>
          <p style="font-size:14px;color:var(--ink-primary);line-height:1.6">
            Confirmed for <strong>${e.name}</strong> (${e.company}) — <strong>${e.slot}</strong>.
            Our principal WebGL architect will review your <strong>${e.packageName}</strong> scope
            prior to our call.
          </p>
          <div class="spec-metric-box">
            <span class="mono-label">LOCKED PACKAGE SUMMARY</span>
            <strong>${e.packageName} · ${e.priceText}</strong>
            <small>Turnaround: ${e.turnaroundText} · Dispatch: ${Z.contactEmail}</small>
          </div>
          <div class="output-actions-row">
            <button type="button" id="download-ics-btn" class="btn btn-primary">
              Download Calendar (.ics)
            </button>
            <button type="button" id="booking-done-btn" class="btn btn-ghost">
              Return to Showcase
            </button>
          </div>
        </div>
      `,r.querySelector(`#download-ics-btn`)?.addEventListener(`click`,()=>{l(e)}),r.querySelector(`#booking-done-btn`)?.addEventListener(`click`,()=>{f()});return}let o=t||a.attachedScopeSummary||`Interested in ${n.tier.name} (${n.priceText}) for upcoming commercial development launch.`;r.innerHTML=`
      <form id="studio-booking-form" class="booking-form">
        <div class="booking-context-pill">
          <span class="mono-accent" style="display:block;margin-bottom:2px">SELECTED ARCHITECTURE</span>
          <strong>${n.tier.name}</strong> · ${n.priceText} · Est. ${n.turnaroundText}
          ${n.addons.length?`<div style="font-size:11.5px;color:var(--ink-secondary);margin-top:3px">Add-ons: ${n.addons.map(e=>e.label).join(`, `)}</div>`:``}
        </div>

        <div class="field-group">
          <label>PREFERRED BRIEFING WINDOW (30 MIN)</label>
          <div class="slot-pills">
            ${i.map(e=>`
                  <button
                    type="button"
                    class="slot-btn ${a.bookingSlot===e?`is-active`:``}"
                    data-slot="${e}"
                  >
                    ${e}
                  </button>
                `).join(``)}
          </div>
        </div>

        <div class="form-grid-2">
          <div class="field-group">
            <label for="book-name">EXECUTIVE NAME</label>
            <input id="book-name" name="name" class="field-input" type="text" required placeholder="Alex Vance" />
          </div>
          <div class="field-group">
            <label for="book-company">FIRM / DEVELOPER</label>
            <input id="book-company" name="company" class="field-input" type="text" required placeholder="Vance Commercial Group" />
          </div>
        </div>

        <div class="field-group">
          <label for="book-email">WORK EMAIL</label>
          <input id="book-email" name="email" class="field-input" type="email" required placeholder="alex@firm.com" />
        </div>

        <div class="field-group">
          <label for="book-notes">ASSET / DEAL CONTEXT</label>
          <textarea id="book-notes" name="notes" class="field-input" rows="3">${o}</textarea>
        </div>

        <button type="submit" id="booking-submit-btn" class="btn btn-amber btn-full">
          Confirm 1-Click Executive Briefing
        </button>
      </form>
    `,r.querySelectorAll(`[data-slot]`).forEach(e=>{e.addEventListener(`click`,()=>{a.bookingSlot=e.dataset.slot,r.querySelectorAll(`[data-slot]`).forEach(e=>{e.classList.toggle(`is-active`,e.dataset.slot===a.bookingSlot)})})}),r.querySelector(`#studio-booking-form`)?.addEventListener(`submit`,t=>{t.preventDefault();let r=new FormData(t.target),i=`NS-${Math.floor(1e4+Math.random()*89999)}`;a.bookingConfirmed=!0,a.lastConfirmation={refId:i,name:String(r.get(`name`)||``).trim(),company:String(r.get(`company`)||``).trim(),email:String(r.get(`email`)||``).trim(),notes:String(r.get(`notes`)||``).trim(),slot:a.bookingSlot,packageName:n.tier.name,priceText:n.priceText,turnaroundText:n.turnaroundText},e?.(`Discovery briefing confirmed (${i}).`),u()})}function d({customNote:e=``}={}){n&&(a.bookingConfirmed=!1,u(e),n.hidden=!1,document.body.style.overflow=`hidden`,n.querySelector(`#book-name`)?.focus())}function f(){n&&(n.hidden=!0,document.body.style.overflow=``)}return i?.addEventListener(`click`,f),n?.addEventListener(`click`,e=>{e.target===n&&f()}),window.addEventListener(`keydown`,e=>{e.key===`Escape`&&n&&!n.hidden&&f()}),c(),{openBookingModal:d,closeBookingModal:f,applyEstimatorBrief({summary:e,recommendedTierId:t}){a.attachedScopeSummary=e,t&&(a.selectedTierId=t),c()}}}function je({scrollController:e,onOpenBooking:t}={}){document.querySelectorAll(`[data-studio-brand]`).forEach(e=>{e.textContent=Z.brandName}),document.querySelectorAll(`[data-studio-regions]`).forEach(e=>{e.textContent=Z.regions}),document.querySelectorAll(`[data-ref-project]`).forEach(e=>{e.textContent=Z.referenceAsset.projectName});let n=document.querySelectorAll(`[data-zone-link]`),r=document.getElementById(`mobile-menu-toggle`),i=document.getElementById(`mobile-nav-drawer`),a=document.getElementById(`nav-book-btn`),o=document.getElementById(`mobile-drawer-book`),s=document.getElementById(`nav-scroll-pct`),c={1:`#zone-hero`,2:`#zone-structural`,3:`#zone-hardware`,4:`#zone-estimator`,5:`#zone-engage`};function l(){i&&r&&(i.hidden=!0,r.setAttribute(`aria-expanded`,`false`))}return r?.addEventListener(`click`,()=>{if(!i)return;let e=!i.hidden;i.hidden=e,r.setAttribute(`aria-expanded`,String(!e))}),document.querySelectorAll(`a[href^="#zone-"], button[data-zone-link]`).forEach(t=>{t.addEventListener(`click`,n=>{let r=t.getAttribute(`href`),i=t.dataset.zoneLink,a=r&&r.startsWith(`#`)?r:c[i];a&&(n.preventDefault(),l(),e?.scrollToTarget(a))})}),a?.addEventListener(`click`,()=>t?.()),o?.addEventListener(`click`,()=>{l(),t?.()}),{setActiveZone(e){n.forEach(t=>{let n=Number(t.dataset.zoneLink)===e;t.classList.toggle(`is-active`,n)})},setScrollPercent(e){s&&(s.textContent=`${String(e).padStart(2,`0`)}%`)}}}var Me=null;function Ne(e){let t=document.getElementById(`studio-toast`);t&&(t.textContent=e,t.hidden=!1,clearTimeout(Me),Me=setTimeout(()=>{t.hidden=!0},3400))}function Pe(){let e=document.getElementById(`studio-canvas`);if(!e)throw Error(`Studio WebGL canvas element (#studio-canvas) not found.`);let t=new we(e),n=Ae({onShowToast:Ne}),r=null,i=Te(t,{onZoneChange:e=>r?.setActiveZone(e),onScrollPercent:e=>r?.setScrollPercent(e)});r=je({scrollController:i,onOpenBooking:e=>n.openBookingModal(e)}),Ee(t),De(t),Oe(t,{onShowToast:Ne,onOpenBooking:e=>n.openBookingModal(e)}),ke({onShowToast:Ne,onSendBriefToEngage:e=>{n.applyEstimatorBrief(e),Ne(`Scope brief synced to Engagement Configurator.`),i.scrollToTarget(`#zone-engage`)}}),window.__STUDIO_ENGINE__=t}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,Pe):Pe();