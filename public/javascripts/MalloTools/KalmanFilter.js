/**
 * Created by roda on 5/23/16.
 */

function KalmanFilter(the_process_variance, the_est_measure_variance, the_posteri_est) {
    this.process_variance = the_process_variance;
    this.est_measure_variance = the_est_measure_variance;
    this.posteri_est = the_posteri_est;
    this.posteri_error_est = 1.0;
    this.input_a_measurement = function (measurement) {
        var priori_est;
        var blending_factor;
        var priori_error_est;

        priori_est = this.posteri_est;
        priori_error_est = this.posteri_error_est + this.process_variance;
        blending_factor = priori_error_est / (priori_error_est + this.est_measure_variance);
        this.posteri_est = priori_est + (blending_factor * (measurement - priori_est));
        this.posteri_error_est = (1 - blending_factor) * priori_error_est;
    }
}