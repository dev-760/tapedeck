import TrackPlayer, { Event } from 'react-native-track-player';

module.exports = async function() {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop());
  TrackPlayer.addEventListener(Event.RemoteSeek, (event) => {
    if (event.position !== undefined) {
      TrackPlayer.seekTo(event.position);
    }
  });
};
