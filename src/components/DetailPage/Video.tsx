import Paper from "../Assets/Paper";

export default function Video({
  url,
  poster,
}: {
  url: string;
  poster: string | null;
}) {
  return (
    <Paper className="mb-4">
      <video
        className="rounded-lg"
        poster={poster ?? ""}
        width="100%"
        height="440"
        controls
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Paper>
  );
}
