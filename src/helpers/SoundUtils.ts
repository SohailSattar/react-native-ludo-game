import { Audio } from 'expo-av';
import { SOUNDS } from '$assets/sfx';

let active: Audio.Sound | null = null;

const resolveSource = (soundName: SOUND_NAME) => {
  switch (soundName) {
    case 'dice_roll':
      return SOUNDS.DiceRoll;
    case 'cheer':
      return SOUNDS.Cheer;
    case 'collide':
      return SOUNDS.Collide;
    case 'game_start':
      return SOUNDS.GameStart;
    case 'sound_girl1':
      return SOUNDS.Girl1;
    case 'sound_girl2':
      return SOUNDS.Girl2;
    case 'sound_girl3':
      return SOUNDS.Girl3;
    case 'sound_girl0':
      return SOUNDS.Girl4;
    case 'home':
      return SOUNDS.Home;
    case 'home_win':
      return SOUNDS.HomeWin;
    case 'pile_move':
      return SOUNDS.PileMove;
    case 'safe_spot':
      return SOUNDS.SafeSpot;
    case 'ui':
      return SOUNDS.UI;
    default:
      throw new Error(`Sound ${soundName} not found`);
  }
};

export const playSound = (soundName: SOUND_NAME) => {
  void (async () => {
    try {
      if (active) {
        await active.stopAsync();
        await active.unloadAsync();
        active = null;
      }
      const source = resolveSource(soundName);
      const { sound } = await Audio.Sound.createAsync(source);
      active = sound;
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          void sound.unloadAsync();
          if (active === sound) {
            active = null;
          }
        }
      });
      await sound.playAsync();
    } catch (err) {
      console.error("Can't play the sound file", err);
    }
  })();
};

export const stopSound = () => {
  void (async () => {
    try {
      if (active) {
        await active.stopAsync();
        await active.unloadAsync();
        active = null;
      }
    } catch (err) {
      console.error("Can't stop the sound file", err);
    }
  })();
};
