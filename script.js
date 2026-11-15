const birthday = new Date('2026-11-26T00:00:00');
function tick(){
 const now=new Date(), diff=birthday-now;
 if(diff<=0){['days','hours','minutes','seconds'].forEach(id=>document.getElementById(id).textContent='00');document.getElementById('count-message').textContent='Chúc mừng sinh nhật Bé Yêu! Hôm nay là ngày của em! 🎂';return;}
 const vals={days:Math.floor(diff/86400000),hours:Math.floor(diff%86400000/3600000),minutes:Math.floor(diff%3600000/60000),seconds:Math.floor(diff%60000/1000)};
 Object.entries(vals).forEach(([k,v])=>document.getElementById(k).textContent=String(v).padStart(2,'0'));
}tick();setInterval(tick,1000);

const envelope=document.getElementById('envelope'), letter=document.getElementById('letterText');
function openLetter(){letter.classList.toggle('show');envelope.style.transform=letter.classList.contains('show')?'scale(.92)':'scale(1)';if(letter.classList.contains('show')){letter.scrollIntoView({behavior:'smooth',block:'center'});heartRain(18);}}
envelope.addEventListener('click',openLetter);envelope.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openLetter();}});
const flame=document.getElementById('flame');
document.getElementById('blow').onclick=()=>{flame.classList.add('off');document.getElementById('wish').textContent='Ước nguyện đã được gửi đến vũ trụ! Chúc Bé Yêu luôn hạnh phúc. 🎉';burst();heartRain(35);};
document.getElementById('relight').onclick=()=>{flame.classList.remove('off');document.getElementById('wish').textContent='Điều ước của em nhất định sẽ thành hiện thực! 💕';};
function heartRain(n){for(let i=0;i<n;i++){const h=document.createElement('div');h.className='heart';h.textContent=['💗','💖','💕','🌸','✨'][Math.floor(Math.random()*5)];h.style.left=Math.random()*100+'vw';h.style.fontSize=(16+Math.random()*24)+'px';h.style.animationDuration=(3+Math.random()*3)+'s';document.body.appendChild(h);setTimeout(()=>h.remove(),6500);}}
setInterval(()=>{if(Math.random()>.45)heartRain(1)},1800);
const audio=document.getElementById('audio'), musicBtn=document.getElementById('music'), audioFile=document.getElementById('audioFile');
musicBtn.addEventListener('click',async()=>{if(!audio.src){audioFile.click();return;}if(audio.paused){try{await audio.play();musicBtn.textContent='Ⅱ';}catch(e){alert('Trình duyệt chưa phát được nhạc. Hãy chọn lại tệp nhạc nhé!');}}else{audio.pause();musicBtn.textContent='♫';}});
audioFile.addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;audio.src=URL.createObjectURL(f);audio.play().then(()=>musicBtn.textContent='Ⅱ').catch(()=>alert('Không thể phát tệp nhạc này.'));});
audio.addEventListener('pause',()=>musicBtn.textContent='♫');audio.addEventListener('play',()=>musicBtn.textContent='Ⅱ');
// Canvas fireworks
const canvas=document.getElementById('fireworks'),ctx=canvas.getContext('2d');let particles=[];
function resize(){canvas.width=innerWidth*devicePixelRatio;canvas.height=innerHeight*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0)}resize();addEventListener('resize',resize);
function burst(){const x=innerWidth*(.2+Math.random()*.6),y=innerHeight*(.15+Math.random()*.45);for(let i=0;i<75;i++){const a=Math.PI*2*i/75,s=1.5+Math.random()*4;particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:70,color:['#ff8fb5','#ffd166','#ffffff','#d98ab0'][Math.floor(Math.random()*4)]});}}
function animate(){ctx.clearRect(0,0,innerWidth,innerHeight);particles=particles.filter(p=>p.life>0);for(const p of particles){p.x+=p.vx;p.y+=p.vy;p.vy+=.025;p.life--;ctx.globalAlpha=p.life/70;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,2.2,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;requestAnimationFrame(animate);}animate();
document.addEventListener('click',e=>{if(e.target.closest('button')||e.target.closest('.btn')){if(Math.random()>.35)burst();}});


/* ===== ALBUM SCRAPBOOK: ảnh được khai báo cố định trong index.html ===== */
const albumDataNode=document.getElementById('album-data');
let loveAlbums=[];
try{
 loveAlbums=JSON.parse(albumDataNode?.textContent||'[]');
 if(!Array.isArray(loveAlbums))throw new Error('Dữ liệu album không hợp lệ');
}catch(error){
 console.error('Không đọc được danh sách ảnh trong index.html:',error);
 loveAlbums=[];
}
let activeAlbum=0,activeAlbumPage=0;
const albumOverlay=document.getElementById('albumOverlay');
const albumGrid=document.getElementById('albumPhotoGrid');
const albumEmpty=document.getElementById('albumEmpty');
const albumPhotosPerPage=4;

// Lightbox: nhấn vào ảnh trong album để xem ảnh lớn, nhấn nền hoặc Escape để đóng.
const photoLightbox=document.createElement('div');
photoLightbox.className='photo-lightbox';
photoLightbox.id='photoLightbox';
photoLightbox.setAttribute('role','dialog');
photoLightbox.setAttribute('aria-modal','true');
photoLightbox.setAttribute('aria-label','Xem ảnh phóng to');
photoLightbox.innerHTML='<button class="photo-lightbox-close" type="button" aria-label="Đóng">×</button><img class="photo-lightbox-image" alt="Ảnh kỷ niệm phóng to"><video class="photo-lightbox-video" controls playsinline preload="metadata"></video><div class="photo-lightbox-caption"></div>';
document.body.appendChild(photoLightbox);
const photoLightboxImage=photoLightbox.querySelector('.photo-lightbox-image');
const photoLightboxVideo=photoLightbox.querySelector('.photo-lightbox-video');
const photoLightboxCaption=photoLightbox.querySelector('.photo-lightbox-caption');
function openPhotoLightbox(src,alt){
 photoLightboxImage.src=src;
 photoLightboxImage.alt=alt||'Ảnh kỷ niệm';
 photoLightboxCaption.textContent=alt||'';
 photoLightbox.classList.add('open');
 document.body.style.overflow='hidden';
}
function openVideoLightbox(src,caption){
 photoLightboxImage.style.display='none';
 photoLightboxVideo.style.display='block';
 photoLightboxVideo.src=src;
 photoLightboxVideo.currentTime=0;
 photoLightboxCaption.textContent=caption||'Video kỷ niệm';
 photoLightbox.classList.add('open');
 document.body.style.overflow='hidden';
 const playAttempt=photoLightboxVideo.play();
 if(playAttempt&&typeof playAttempt.catch==='function')playAttempt.catch(()=>{});
}
function closePhotoLightbox(){
 photoLightbox.classList.remove('open');
 photoLightboxImage.removeAttribute('src');
 photoLightboxVideo.pause();
 photoLightboxVideo.removeAttribute('src');
 photoLightboxVideo.load();
 photoLightboxVideo.style.display='none';
 photoLightboxImage.style.display='block';
 if(!albumOverlay.classList.contains('open'))document.body.style.overflow='';
}
photoLightbox.querySelector('.photo-lightbox-close').addEventListener('click',closePhotoLightbox);
photoLightbox.addEventListener('click',event=>{if(event.target===photoLightbox)closePhotoLightbox();});

function updateAlbumCounts(){
 loveAlbums.forEach((album,index)=>{
  const countNode=document.getElementById('albumCount'+index);
  if(countNode)countNode.textContent=(album.photos?.length||0)+' mục';
 });
}
function renderLoveAlbum(){
 const album=loveAlbums[activeAlbum];
 if(!album)return;
 const photos=Array.isArray(album.photos)?album.photos:[];
 const totalPages=Math.max(1,Math.ceil(photos.length/albumPhotosPerPage));
 activeAlbumPage=Math.min(activeAlbumPage,totalPages-1);
 document.getElementById('albumTitle').textContent=album.name||'Kỷ niệm';
 document.getElementById('albumPageNumber').textContent=`Trang ${activeAlbumPage+1} / ${totalPages}`;
 document.getElementById('albumPrev').disabled=activeAlbumPage===0;
 document.getElementById('albumNext').disabled=activeAlbumPage>=totalPages-1;
 albumGrid.innerHTML='';
 const visiblePhotos=photos.slice(activeAlbumPage*albumPhotosPerPage,(activeAlbumPage+1)*albumPhotosPerPage);
 albumEmpty.style.display=photos.length?'none':'block';
 visiblePhotos.forEach((photo,index)=>{
  const mediaPath=typeof photo==='string'?photo:photo.src;
  if(!mediaPath)return;
  const frame=document.createElement('div');frame.className='album-polaroid';
  frame.style.setProperty('--tilt',['-2deg','1.5deg','2deg','-1deg'][index%4]);
  const declaredType=typeof photo==='object'?photo.type:'';
  const isVideo=declaredType==='video'||(!declaredType&&/\.(mp4|webm|ogg|ogv)(?:[?#].*)?$/i.test(mediaPath));
  if(isVideo){
   const video=document.createElement('video');
   video.src=mediaPath;video.controls=true;video.playsInline=true;video.preload='metadata';
   video.setAttribute('aria-label',(typeof photo==='object'&&photo.alt)?photo.alt:'Video kỷ niệm của hai người');
   video.onerror=()=>{frame.classList.add('image-missing');video.title='Không tìm thấy video: '+mediaPath;};
   frame.appendChild(video);
   const expandVideo=document.createElement('button');
   expandVideo.type='button';expandVideo.className='video-expand';expandVideo.textContent='⛶';
   expandVideo.setAttribute('aria-label','Phóng to video');expandVideo.title='Xem video phóng to';
   expandVideo.addEventListener('click',event=>{event.stopPropagation();openVideoLightbox(mediaPath,video.getAttribute('aria-label'));});
   frame.appendChild(expandVideo);
  }else{
   const img=document.createElement('img');img.src=mediaPath;img.alt=(typeof photo==='object'&&photo.alt)?photo.alt:'Kỷ niệm của hai người';
   img.loading='lazy';
   img.title='Nhấn để phóng to ảnh';
   img.addEventListener('click',()=>openPhotoLightbox(img.currentSrc||img.src,img.alt));
   img.onerror=()=>{frame.classList.add('image-missing');img.alt='Không tìm thấy ảnh: '+mediaPath;};
   frame.appendChild(img);
  }
  albumGrid.appendChild(frame);
 });
}
function openLoveAlbum(index){
 if(!loveAlbums[index])return;
 activeAlbum=index;activeAlbumPage=0;renderLoveAlbum();
 albumOverlay.classList.add('open');albumOverlay.setAttribute('aria-hidden','false');
 document.body.style.overflow='hidden';
}
function closeLoveAlbum(){
 albumOverlay.classList.remove('open');albumOverlay.setAttribute('aria-hidden','true');
 document.body.style.overflow='';
}
function changeAlbumPage(direction){
 const lastPage=Math.max(0,Math.ceil((loveAlbums[activeAlbum]?.photos?.length||0)/albumPhotosPerPage)-1);
 const nextPage=Math.max(0,Math.min(lastPage,activeAlbumPage+direction));
 if(nextPage===activeAlbumPage)return;
 const book=document.getElementById('albumBook');
 book.animate([{transform:'rotateY(0deg)',opacity:1},{transform:'rotateY(-12deg)',opacity:.65},{transform:'rotateY(0deg)',opacity:1}],{duration:420,easing:'ease-in-out'});
 activeAlbumPage=nextPage;
 setTimeout(renderLoveAlbum,180);
}
document.querySelectorAll('.memory-folder').forEach(button=>{
 button.addEventListener('click',()=>openLoveAlbum(Number(button.dataset.album)));
});
document.getElementById('albumClose').addEventListener('click',closeLoveAlbum);
albumOverlay.addEventListener('click',event=>{if(event.target===albumOverlay)closeLoveAlbum();});
document.getElementById('albumPrev').addEventListener('click',()=>changeAlbumPage(-1));
document.getElementById('albumNext').addEventListener('click',()=>changeAlbumPage(1));
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'&&photoLightbox.classList.contains('open'))closePhotoLightbox();
 else if(event.key==='Escape'&&albumOverlay.classList.contains('open'))closeLoveAlbum();
});
updateAlbumCounts();
