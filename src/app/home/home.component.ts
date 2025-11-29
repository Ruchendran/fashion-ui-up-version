import { CommonModule,isPlatformBrowser} from '@angular/common';
import {  Component,ElementRef,HostListener,OnInit,ViewChild,PLATFORM_ID, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { WearSectionComponent } from '../wear-section/wear-section.component';
import { Meta,Title } from '@angular/platform-browser'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule,WearSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  @ViewChild('fashionSection') fashionSection!:ElementRef;
  @ViewChild('threeDImg1') threeDImg1!:ElementRef;
  @ViewChild('threeDImg3') threeDImg3!:ElementRef;
  contentAnimation=false;
  metaData: any;
  constructor(private router:Router,private metaService:Meta,private titleService:Title,private activatedRoute:ActivatedRoute, @Inject(PLATFORM_ID) private platformId:Object){

  }
updMeta(metaData:any){
        // Ensure you're setting the correct <title> tag as well
        this.titleService.setTitle(metaData.title); 
        this.metaService.updateTag({property:'og:title',content:metaData.title});
        this.metaService.updateTag({property:'og:description',content:metaData.description});
        // Use the image from the resolved data if available, otherwise use a fallback
        this.metaService.updateTag({property:'og:image',content:metaData.image || 'https://fashion-ui.netlify.app/assets/home-section/zoom/zoom-img.jpg'})
    }
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)){
      window.scrollTo(0,0);
    }
    // window.location.reload();
    const resolvedSeoData = this.activatedRoute.snapshot.data['seoData'];
    if (resolvedSeoData) {
      this.metaData = resolvedSeoData;
      this.updMeta(this.metaData);
    }
  }
  @HostListener('window:scroll')
  onScroll=()=>{
    // console.log(window.scrollY)
    if(window.scrollY>300 && window.scrollY<900){
      this.contentAnimation=true;
    }
    else{
      this.contentAnimation=false;
    }
    if(window.scrollY > 1300 && window.scrollY<1400){
     let image1= this.threeDImg1.nativeElement as HTMLImageElement
     let image1Val=-50+(window.scrollY-1300)/5;
     if(image1Val<0){
      image1.style.transform=`perspective(1000px) rotateY(${image1Val}deg)`
     }
     else{
      image1.style.transform='perspective(1000px) rotateY(0deg)'
     }
     let image3=this.threeDImg3.nativeElement as HTMLImageElement
     let image3Val=50-(window.scrollY-1300)/5;
    if(image3Val>0){
      image3.style.transform=`perspective(1000px) rotateY(${image3Val}deg)`
     }
      else{
        image3.style.transform='perspective(1000px)rotateY(0deg)'
     }
    }

  }

}
