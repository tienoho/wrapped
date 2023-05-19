import Statistic from "./Statistic";

export type WatchSessionsStatisticResult = {
  totalWatchTimeSec: number;
  totalSessions: number;
  averageSessionLengthSec: number;
  earliestVideoWatched: Date;
  latestVideoWatched: Date;
  longestWatchSession: {
    startTime: Date;
    endTime: Date;
    lengthSec: number;
  };
};

export default class WatchSessionsStatistic extends Statistic<WatchSessionsStatisticResult> {
  // Watch History only contains info about when a video started - not when it ended.
  // This is the maximum time between videos in seconds that is assumed to be the time
  // the user watched the video. Otherwise is is assumed that the app has been closed
  // and the session has ended.
  static readonly MAX_TIME_BETWEEN_VIDEOS = 60 * 5;

  // At the end of the session (see previous comment) it is assumed that the user
  // watched the last video for this amount of seconds - just to make sure that many
  // short sessions are not ignored.
  static readonly SESSION_END_TIME = 5;

  calculateResult(): WatchSessionsStatisticResult {
    let totalWatchTimeSec = 0;
    let totalSessions = 1;

    let currentSessionStartTime = null;
    let sessionLengths = [];

    const videoList =
      this.wrapped.userData.Activity[
        "Video Browsing History"
      ].VideoList?.reverse();
    if (!videoList) {
      return {
        totalWatchTimeSec: 0,
        totalSessions: 0,
        averageSessionLengthSec: 0,
        earliestVideoWatched: new Date(),
        latestVideoWatched: new Date(),
        longestWatchSession: {
          startTime: new Date(),
          endTime: new Date(),
          lengthSec: 0,
        },
      };
    }

    let longestWatchSession = {
      startTime: new Date(videoList[0].Date),
      endTime: new Date(videoList[0].Date),
      lengthSec: 0,
    };

    for (let i = 1; i < videoList.length; i++) {
      const video = videoList[i];
      const previousVideo = videoList[i - 1];

      const videoStartTime = new Date(video.Date);
      if (!currentSessionStartTime) {
        currentSessionStartTime = videoStartTime;
      }

      const previousVideoStartTime = new Date(previousVideo.Date);

      const timeBetweenVideoWatched = Math.abs(
        (videoStartTime.getTime() - previousVideoStartTime.getTime()) / 1000
      ); // in seconds

      if (
        timeBetweenVideoWatched < WatchSessionsStatistic.MAX_TIME_BETWEEN_VIDEOS
      ) {
        totalWatchTimeSec += timeBetweenVideoWatched;
      } else {
        // End of a session
        totalWatchTimeSec += WatchSessionsStatistic.SESSION_END_TIME;
        totalSessions++;

        const sessionLength =
          (videoStartTime.getTime() - currentSessionStartTime.getTime()) / 1000;
        sessionLengths.push(sessionLength);

        if (sessionLength > longestWatchSession.lengthSec) {
          longestWatchSession = {
            startTime: currentSessionStartTime,
            endTime: videoStartTime,
            lengthSec: sessionLength,
          };
        }

        currentSessionStartTime = null;
      }
    }

    return {
      totalWatchTimeSec,
      totalSessions,
      averageSessionLengthSec:
        sessionLengths.reduce((a, b) => a + b, 0) / sessionLengths.length,
      earliestVideoWatched: new Date(videoList[0].Date),
      latestVideoWatched: new Date(videoList[videoList.length - 1].Date),
      longestWatchSession,
    };
  }
}