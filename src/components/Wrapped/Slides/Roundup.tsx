import React from "react";
import WrappedContainer, { WrappedSlideProps } from "../WrappedContainer";
import formatTimeLength from "@/lib/utils/formatTimeLength";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import getShareUrl from "@/lib/utils/getShareUrl";
import { Loader2, Share2 } from "lucide-react";
import shareImage from "@/lib/utils/shareImage";

function Roundup({ statistics }: WrappedSlideProps) {
  const { amount: totalWatchTimeAmount, unit: totalWatchTimeUnit } =
    formatTimeLength(statistics.watchSessions.totalWatchTimeSec);

  const { amount: averageSessionLengthAmount, unit: averageSessionLengthUnit } =
    formatTimeLength(statistics.watchSessions.averageSessionLengthSec);

  const [isLoadingShareImage, setIsLoadingShareImage] = React.useState(false);

  return (
    <WrappedContainer bg="bg-zinc-900" text="text-starship-400">
      <div className="p-12">
        <h1 className="text-2xl font-black text-starship-400 animate-in slide-in-from-bottom fade-in duration-1000 pb-12">
          And you did so much more...
        </h1>

        <div className="w-4xl dark text-zinc-200 text-left">
          <Table className="w-full">
            <TableBody>
              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Watch Sessions</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Total videos watched
                </TableCell>
                <TableCell>
                  {statistics.videoAmountWatched.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Total watch time
                </TableCell>
                <TableCell>
                  {totalWatchTimeAmount} {totalWatchTimeUnit}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Watch sessions</TableCell>
                <TableCell>
                  {statistics.watchSessions.totalSessions.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Average session length
                </TableCell>
                <TableCell>
                  {Math.abs(averageSessionLengthAmount)}{" "}
                  {averageSessionLengthUnit}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Earliest video watched in data
                </TableCell>
                <TableCell>
                  {dayjs(statistics.watchSessions.earliestVideoWatched).format(
                    "DD/MM/YYYY HH:mm"
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Last video watched in data
                </TableCell>
                <TableCell>
                  {dayjs(statistics.watchSessions.latestVideoWatched).format(
                    "DD/MM/YYYY HH:mm"
                  )}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Comments</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Total Comments</TableCell>
                <TableCell>
                  {statistics.comments.totalComments.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Average Comment Length
                </TableCell>
                <TableCell>
                  {Math.round(statistics.comments.avgCommentLength)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Most used emoji</TableCell>
                <TableCell>
                  {statistics.comments.mostUsedEmoji.emoji} (x
                  {statistics.comments.mostUsedEmoji.count.toLocaleString()})
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Likes</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Total likes</TableCell>
                <TableCell>
                  {statistics.likes.totalLikes.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Day with most liked posts
                </TableCell>
                <TableCell>
                  {dayjs(statistics.likes.dayWithMostLikedPosts.day).format(
                    "DD/MM/YYYY"
                  )}{" "}
                  (x
                  {statistics.likes.dayWithMostLikedPosts.count.toLocaleString()}
                  )
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  First liked video
                </TableCell>
                <TableCell>
                  {dayjs(statistics.likes.firstLikedVideo.date).format(
                    "DD/MM/YYYY"
                  )}
                  <br />
                  <a
                    href={statistics.likes.firstLikedVideo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Link
                  </a>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Shares</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">Total shares</TableCell>
                <TableCell>
                  {statistics.shares.totalShares.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Day with most shared posts
                </TableCell>
                <TableCell>
                  {dayjs(statistics.shares.dayWithMostSharedPosts.day).format(
                    "DD/MM/YYYY"
                  )}{" "}
                  (x
                  {statistics.shares.dayWithMostSharedPosts.count.toLocaleString()}
                  )
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  First shared video
                </TableCell>
                <TableCell>
                  {dayjs(statistics.shares.firstSharedVideo.date).format(
                    "DD/MM/YYYY"
                  )}
                  <br />
                  <a
                    href={statistics.shares.firstSharedVideo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Link
                  </a>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="text-zinc-400">
                  <strong className="text-starship-400">Live</strong>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Total Lives viewed
                </TableCell>
                <TableCell>
                  {statistics.live.totalLiveViewed.toLocaleString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-zinc-400">
                  Total comments on lives
                </TableCell>
                <TableCell>
                  {statistics.live.totalLiveComments.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Button
            onClick={async () => {
              setIsLoadingShareImage(true);

              const url = getShareUrl(statistics);
              await shareImage(url);

              setTimeout(() => {
                setIsLoadingShareImage(false);
              }, 1000);
            }}
            className="mt-12 w-full"
            disabled={isLoadingShareImage}
          >
            {isLoadingShareImage ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              <>
                <Share2 className="inline-block mr-2" size={16} />
                Share image
              </>
            )}
          </Button>
        </div>
      </div>
    </WrappedContainer>
  );
}

export default Roundup;