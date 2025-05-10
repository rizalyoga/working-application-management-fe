import YouTube from "react-youtube";
const opts = {
  height: "400",
  width: "895",
  playerVars: {
    // Konfigurasi player YouTube
    autoplay: 0, // Jangan otomatis play
    controls: 1, // Tampilkan kontrol player
    fs: 1, // Aktifkan tombol fullscreen (1 = aktif, 0 = nonaktif)
  },
};

const DemoVideoSection = () => {
  return (
    <section id="demo" className="py-12 bg-white dark:bg-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-primary font-semibold tracking-wide uppercase">
            See it in action
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-dark sm:text-4xl">
            Watch Our Quick Demo
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            See how JobTrack can transform your job search process in under 2
            minutes.
          </p>
        </div>

        <div className="mt-10 aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-xl max-w-4xl mx-auto">
          <div className="bg-gray-200 w-full h-[400px] flex items-center justify-center">
            <YouTube videoId="hGzVY88q8I0" opts={opts} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoVideoSection;
