
import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../post/post";

export const POSTS :  Post[] = [
  { title : "Le premier post", content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", created_at : new Date(), loveIts : 1  },
  { title : "Le deuxième post", content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", created_at : new Date(), loveIts : -1  },
  { title : "Le troisième post", content : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ", created_at : new Date(), loveIts : 0  },
];

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit
{
  @Input() title : string;

  posts : Post[] = POSTS;

  ngOnInit() {
  }
}
