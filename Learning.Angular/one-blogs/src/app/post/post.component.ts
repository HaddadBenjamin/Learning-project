import {Component, Input, OnInit} from '@angular/core';
import {Post} from "./post";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit
{
  @Input() post : Post;

  OnLike()
  {
    ++this.post.loveIts;
  }

  OnDislike()
  {
    --this.post.loveIts;
  }

  GetTextClass()
  {
    return {
      'text-success': this.post.loveIts > 0,
      'text-danger': this.post.loveIts < 0,
    };
  }

  GetBackgroundClass()
  {
    return {
      'blue-gradient': this.post.loveIts > 0,
      'purple-gradient': this.post.loveIts < 0,
    };
  }

  constructor() { }

  ngOnInit() {
  }

}
