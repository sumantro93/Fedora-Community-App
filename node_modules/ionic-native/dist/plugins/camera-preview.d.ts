import { Observable } from 'rxjs/Observable';
export interface CameraPreviewOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    /**
     * Choose the camera to use (front- or back-facing).
     *  'front' for front camera
     *  'rear' for rear camera
     */
    camera: string;
    /** Take photo on tap */
    tapPhoto: boolean;
    /** */
    previewDrag: boolean;
    /**  */
    toBack: boolean;
    /** Alpha use when toBack is set to true */
    alpha: number;
}
export interface CameraPreviewSize {
    maxWidth: number;
    maxHeight: number;
}
/**
 * @name CameraPreview
 * @description
 * Showing camera preview in HTML
 *
 * Requires {@link module:driftyco/ionic-native} and the Cordova plugin: `cordova-plugin-camera-preview`. For more info, please see the [Cordova Camera Preview Plugin Docs](https://github.com/cordova-plugin-camera-preview/cordova-plugin-camera-preview).
 *
 */
export declare class CameraPreview {
    /**
     * Starts the camera preview instance.
     * @param {CameraPreviewOptions} options for the preview
     */
    static startCamera(options: CameraPreviewOptions): void;
    /**
     * Stops the camera preview instance.
     */
    static stopCamera(): void;
    /**
     * Take the picture, the parameter size is optional
     */
    static takePicture(size: CameraPreviewSize): void;
    /**
     * Register a callback function that receives the original picture and the image captured from the preview box.
     */
    static setOnPictureTakenHandler(): Observable<any>;
    /**
     * Switch from the rear camera and front camera, if available.
     */
    static switchCamera(): void;
    /**
     * Show the camera preview box.
     */
    static show(): void;
    /**
     * Hide the camera preview box.
     */
    static hide(): void;
    /**
     * Set the default mode for the Flash.
     */
    /**
     * Set camera color effect.
     */
    static setColorEffect(effect: string): void;
    /**
     * @private
     * @enum {number}
     */
    static FlashMode: {
        OFF: number;
        ON: number;
        AUTO: number;
    };
}
