import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.css'],
})
export class MainPage implements OnInit {
  items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
