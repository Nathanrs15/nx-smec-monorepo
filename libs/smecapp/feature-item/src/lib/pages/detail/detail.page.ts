import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.css'],
})
export class DetailPage implements OnInit {
  id!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['itemId'];
  }
}
