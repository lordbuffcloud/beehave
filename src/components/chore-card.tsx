import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatHoney } from "@/lib/utils";
import { Camera, CheckCircle2 } from "lucide-react";
import type { Chore, User } from "@/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ChoreCardProps {
  chore: Chore;
  user: User;
  onComplete?: (choreId: string) => void;
  onTakePhoto?: (choreId: string) => void;
}

export function ChoreCard({ chore, user, onComplete, onTakePhoto }: ChoreCardProps) {
  const isKidMode = user.uiMode === 'kid';
  const isCompleted = chore.status === 'done';
  
  return (
    <Card 
      role="article"
      className={cn(
        "transition-all duration-200 hover:shadow-lg",
        isKidMode && "kid-mode",
        isCompleted && "bg-honey-50 border-honey-200"
      )}
    >
      <CardHeader className={cn("pb-3", isKidMode && "pb-4")}>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className={cn(
            "text-lg leading-tight", 
            isKidMode && "text-xl",
            isCompleted && "text-honey-700"
          )}>
            {chore.title}
          </CardTitle>
          <div className="flex gap-2">
            <Badge 
              variant={chore.frequency === 'daily' ? 'default' : 'secondary'}
              className={cn(isKidMode && "text-sm px-3 py-1")}
            >
              {chore.frequency}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn(
                "bg-honey-100 text-honey-800 border-honey-300",
                isKidMode && "text-sm px-3 py-1 font-semibold"
              )}
            >
              {formatHoney(chore.honeyValue)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className={cn("pt-0", isKidMode && "px-6")}>
        <p className={cn(
          "text-muted-foreground mb-4",
          isKidMode && "text-base text-gray-700"
        )}>
          {chore.description}
        </p>

        {chore.proofPhotoURL && (
          <div className="mb-4 relative w-full h-32">
            <Image
              src={chore.proofPhotoURL}
              alt="Proof photo for completed chore"
              fill
              sizes="100vw"
              className="object-cover rounded-md border"
            />
          </div>
        )}
      </CardContent>

      <CardFooter className={cn("pt-0", isKidMode && "px-6 pb-6")}>
        {isCompleted ? (
          <div className="flex items-center gap-2 text-honey-700 font-medium">
            <CheckCircle2 className="h-5 w-5" />
            <span>Completed!</span>
          </div>
        ) : (
          <div className="flex gap-2 w-full">
            {onTakePhoto && (
              <Button
                variant="outline"
                size={isKidMode ? "kid" : "default"}
                onClick={() => onTakePhoto(chore.id)}
                className="flex-1"
              >
                <Camera className="h-4 w-4 mr-2" />
                Take Photo
              </Button>
            )}
            <Button
              variant={isKidMode ? "honey" : "default"}
              size={isKidMode ? "kid" : "default"}
              onClick={() => onComplete?.(chore.id)}
              className={cn("flex-1", !onTakePhoto && "w-full")}
            >
              Complete Chore
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
} 