import { Component } from 'react';
import '../css/App.css';

// Import iPod body file
import Case from './Case.js';

// Import songs
import song1 from "../static/songs/Besomorph  Silent Child  IDGAF.mp3"
import song2 from "../static/songs/Billie Eilish  Six Feet Under.mp3"
import song3 from "../static/songs/Confetti  Ghost.mp3"
import song4 from "../static/songs/DHARIA  Sugar  Brownies.mp3"
import song5 from "../static/songs/Jony Love Your Voice.mp3"

// Import song cover images
import song1Img from "../static/Besomorph  Silent Child  IDGAF.png";
import song2Img from "../static/Billie Eilish  Six Feet Under.png";
import song3Img from "../static/Confetti  Ghost.png";
import song4Img from "../static/DHARIA  Sugar  Brownies.png";
import song5Img from "../static/Jony Love Your Voice.png";

// Import wallpapers
import AudioTapes from "../static/AudioTapes.png"
import BlueCubes from "../static/BlueCubes.png"
import BlueJelly from "../static/BlueJelly.png"

class App extends Component {
  constructor() {
    super();
    this.state = {
      active: 0,
      menuItems: ["Now Playing", "Music", "Games", "Settings"],
      musicItems: ["All Songs", "Artist", "Albums"],
      songItemsUrl: [song1, song2, song3, song4, song5],
      songImgItemsUrl: [song1Img, song2Img, song3Img, song4Img, song5Img],
      songItems: ["Besomorph  Silent Child  IDGAF", "Billie Eilish  Six Feet Under", "Confetti  Ghost", "DHARIA  Sugar  Brownies", "Jony Love Your Voice"],
      songIndex: 0,
      songUrl: song1,
      playing: false,
      currentMenu: -2,
      audio: new Audio(song1),
      songImgUrl: song1Img,
      navigationStack: [],
      lengthMenuKey: { "-1": 3, 1: 2, 4: 4, 8: 4, 3: 2, 9: 3, 10: 2 },  //length of a particular menu
      menuMapping: { "-1": [0, 1, 2, 3], 1: [4, 5, 6], 3: [8, 9, 10] }, //which menu can be rendered by key menu
      wallpaperItems: [AudioTapes, BlueCubes, BlueJelly], //wallpapers
      wallpaper: 0,
      theme: "rgb(210, 210, 210)", //current body theme
      wheelColor: "white", //current wheel color
      noty: false, // has to show notification or not
      notifyText: "Wallpaper Changed", //notification text
    }
  }

  seekSongForward = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }

    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;

      if (songIndex === this.state.songImgItemsUrl.length - 1) {
        songIndex = 0;
      } else {
        songIndex++;
      }

      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];

      this.setState({ songIndex: songIndex, songImgUrl: songImgUrl, songUrl: songUrl, audio: new Audio(songUrl) }, () => {
        this.state.audio.play();
      });
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime += interval;
        return prevState;
      })
    }
  }

  seekSongBackword = (e) => {
    if (this.state.currentMenu === -2) {
      return;
    }
    if (this.state.playing === false) {
      return;
    }
    console.log(e.detail.interval);
    if (e.detail.interval < 250) {
      this.state.audio.pause();
      let songIndex = this.state.songIndex;
      if (songIndex === 0) {
        songIndex = this.state.songItemsUrl.length - 1;
      } else {
        songIndex--;
      }
      const songUrl = this.state.songItemsUrl[songIndex];
      const songImgUrl = this.state.songImgItemsUrl[songIndex];
      this.setState({ songIndex: songIndex, songImgUrl: songImgUrl, songUrl: songUrl, audio: new Audio(songUrl) }, () => {
        this.state.audio.play();
      });
    } else if (e.detail.interval > 250 && e.detail.interval < 10000) {
      const interval = e.detail.interval / 100;
      this.setState((prevState) => {
        prevState.audio.currentTime -= interval;
        return prevState;
      })
    }
  }

  togglePlayPause = () => {
    if (this.state.currentMenu === -2) {
      return;
    }

    if (this.state.playing === true) {
      this.setState({ playing: false });
      this.state.audio.pause();
    }

    else {
      this.setState({ playing: true });
      this.state.audio.play();
    }
  }

  setTheme = (id) => {
    let theme = "";
    if (id === 0) {
      theme = "#FDDCD7";
    }
    else if (id === 1) {
      theme = "rgb(210, 210, 210)"
    } else if (id === 2) {
      theme = "#F5DDC5";
    } else if (id === 3) {
      theme = "#D1CDDA";

    } else if (id === 4) {
      theme = "black"
    }
    this.setState({ theme: theme, noty: true, notifyText: "Theme Changed" })
    return;
  }

  setWheelColor = (id) => {
    let wheelColor = "";
    if (id === 0) {
      wheelColor = "#212121";
    }
    else if (id === 1) {
      wheelColor = "white";
    } else if (id === 2) {
      wheelColor = "#3E2723";
    } else if (id === 3) {
      wheelColor = "#3D5AFE";
    }
    this.setState({ wheelColor: wheelColor, noty: true, notifyText: "Wheel Color Changed" })
    return;
  }

  // FUNCTION FOR : SET WALLPAPER OF iPod Body
  setWallpaper = (id) => {
    this.setState({ wallpaper: id, noty: true, notifyText: "Wallpaper Changed" });
    return;
  }

  updateActiveMenu = (direction, menu) => {

    if (menu !== -1 && menu !== 1 && menu !== 4 && menu !== 8 && menu !== 3 && menu !== 9 && menu !== 10) {
      return;
    }
    let min = 0;
    let max = 0;

    max = this.state.lengthMenuKey[menu];

    if (direction === 1) {
      if (this.state.active >= max) {
        this.setState({ active: min })
      } else {
        this.setState({ active: this.state.active + 1 })
      }
    } else {
      if (this.state.active <= min) {
        this.setState({ active: max })
      } else {
        this.setState({ active: this.state.active - 1 })
      }
    }
  }

  // FUNCTION FOR : CHANGE PLAYING MUSIC
  changePlayingSongFromMusicMenu = (id, navigationStack) => {
    const songUrl = this.state.songItemsUrl[id];
    const songImgUrl = this.state.songImgItemsUrl[id];
    this.state.audio.pause();
    this.setState({ currentMenu: 7, songUrl: songUrl, navigationStack: navigationStack, active: 0, playing: true, songIndex: id, audio: new Audio(songUrl), songImgUrl: songImgUrl }, () => {
      this.state.audio.play();
    });
    return;
  }

  changeMenuBackward = () => {

    const navigationStack = this.state.navigationStack.slice();
    if (this.state.currentMenu === -2) {
      return;
    }
    else {
      const prevId = navigationStack.pop();
      this.setState({ currentMenu: prevId, navigationStack: navigationStack, active: 0 });
      return;
    }

  }

  changeMenuForward = (id, fromMenu) => {

    const navigationStack = this.state.navigationStack.slice();

    if (fromMenu !== -2 && fromMenu !== -1 && fromMenu !== 1 && fromMenu !== 4 && fromMenu !== 3 && fromMenu !== 8 && fromMenu !== 9 && fromMenu !== 0 && fromMenu !== 7 && fromMenu !== 10) {
      return;
    }

    if (fromMenu === -2) {
      navigationStack.push(this.state.currentMenu);
      this.setState({ currentMenu: -1, navigationStack: navigationStack, active: 0 });
      return;
    }

    if (fromMenu === -1) {
      navigationStack.push(this.state.currentMenu);
      this.setState({ currentMenu: id, navigationStack: navigationStack, active: 0 });
      return;
    }

    if (fromMenu === 7 || fromMenu === 0) {
      this.togglePlayPause();
      return;
    }

    if (fromMenu === 8) {
      this.setTheme(id);
      return;
    }

    if (fromMenu === 9) {
      this.setWheelColor(id)
      return;
    }

    if (fromMenu === 10) {
      this.setWallpaper(id)
      return;
    }

    navigationStack.push(this.state.currentMenu);

    if (fromMenu === 4) {
      this.changePlayingSongFromMusicMenu(id, navigationStack, fromMenu);
      return;
    }

    const currentMenuID = this.state.menuMapping[fromMenu][id];
    this.setState({ currentMenu: currentMenuID, navigationStack: navigationStack, active: 0 });

  }

  setNoty = () => {
    this.setState({ noty: false });
    return;
  }

  render() {

    const { audio, active, currentMenu, menuItems, musicItems, songItems, playing, songIndex, theme, songUrl, songImgUrl, wheelColor, wallpaper, wallpaperItems, noty, notifyText } = this.state;

    return (
      <div className="App">
        {/* <KnowMore /> */}
        <Case songIndex={songIndex} active={active} menuItems={menuItems} musicItems={musicItems} currentMenu={currentMenu} changeMenuForward={this.changeMenuForward} changeMenuBackward={this.changeMenuBackward} updateActiveMenu={this.updateActiveMenu} togglePlayPause={this.togglePlayPause} songItems={songItems} playing={playing} theme={theme} audio={audio} songUrl={songUrl} songImgUrl={songImgUrl} seekSongForward={this.seekSongForward} seekSongBackword={this.seekSongBackword} wheelColor={wheelColor} wallpaper={wallpaper} wallpaperItems={wallpaperItems} noty={noty} setNoty={this.setNoty} notifyText={notifyText} />      </div>
    );
  }
}

export default App;
