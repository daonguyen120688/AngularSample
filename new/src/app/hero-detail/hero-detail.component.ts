import { Component, OnInit, Input } from '@angular/core';
import { Hero,Message } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroServiceService }  from '../hero-service.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  message:Message;

  constructor(private route: ActivatedRoute,
    private heroService: HeroServiceService,
    private location: Location) { }

  ngOnInit() {
    this.getHero();
  }

  getHero():void{
    const id=+this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(h=>this.hero=h);
  }

  onUpdateHero():void{
    this.heroService.updateHero(this.hero).subscribe(m=>{
      if(m.HasError)
    {
      alert(m.Message);
    }
    else
    {
      this.goBack();
    }
    });
    
  }

  goBack():void{
    this.location.back();
  }
}
