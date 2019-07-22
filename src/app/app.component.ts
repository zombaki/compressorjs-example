import { Component, ViewChild, Inject, Renderer2, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { LyTheme2, ThemeVariables } from '@alyle/ui';
import { LyResizingCroppingImages, ImgCropperConfig, ImgCropperEvent } from '@alyle/ui/resizing-cropping-images';

import { styles } from './app.styles';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent  {
  classes = this.theme.addStyleSheet(styles);
  croppedImg: string;
  @ViewChild(LyResizingCroppingImages) imgCropper: LyResizingCroppingImages;
  scale: number;
  myConfig: ImgCropperConfig = {
    width: 150,
    height: 150,
    fill: '#ff2997'
  };

  constructor(
    private theme: LyTheme2
  ) { }

  /** on event */
  onCrop(e: ImgCropperEvent) {
    this.croppedImg = e.dataURL;
    console.log(e);
  }
  /** manual crop */
  getCroppedImg() {
    const img = this.imgCropper.crop();
    console.log(img);
    return img.dataURL;
  }
}
