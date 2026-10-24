import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { askAi } from "../api/client";
import { Button } from "@/components/ui/button";
import { reviewFormSchema, type ReviewFormData } from "../schemas/reviewSchema";
import type { AiReview } from "../types";

const READINESS_LABEL: Record<AiReview["readiness"], string> = {
  ready: "Ready to submit",
  almost: "Almost ready",
  "not-yet": "Not ready yet",
};

const READINESS_STYLE: Record<AiReview["readiness"], string> = {
  ready: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200",
  almost: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  "not-yet": "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200",
};

function ReviewPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: { prompt: "" },
  });

  const reviewMutation = useMutation({
    mutationFn: ({ prompt }: ReviewFormData) => askAi(prompt),
  });

  const onSubmit = (data: ReviewFormData) => {
    reviewMutation.mutate(data);
  };

  const review = reviewMutation.data;

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-black text-[#3D0C02] dark:text-[#FAAB18]">
          AI Project Review
        </h1>
        <p className="mt-2 text-[#3D0C02]/70 dark:text-[#FFFDF3]/70">
          Describe your project and get feedback on its strengths, improvements,
          and readiness to submit.
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-4 rounded-2xl border border-[#3D0C02]/10 bg-white p-6 shadow-sm dark:border-[#FAAB18]/20 dark:bg-[#2B1517]"
      >
        <div>
          <label
            htmlFor="project-description"
            className="mb-2 block font-bold"
          >
            Project description
          </label>
          <textarea
            id="project-description"
            rows={8}
            maxLength={2000}
            placeholder="Describe what your project does, its main features, and the technologies you used."
            aria-invalid={Boolean(errors.prompt)}
            aria-describedby={errors.prompt ? "prompt-error" : undefined}
            className="w-full rounded-xl border border-[#3D0C02]/20 bg-[#FFFDF3] p-4 text-[#3D0C02] outline-none focus:border-[#FAAB18] focus:ring-2 focus:ring-[#FAAB18]/30 dark:border-[#FAAB18]/30 dark:bg-[#1E0C0E] dark:text-[#FFFDF3]"
            {...register("prompt")}
          />
          {errors.prompt && (
            <p
              id="prompt-error"
              role="alert"
              className="mt-2 text-sm text-red-700 dark:text-red-300"
            >
              {errors.prompt.message}
            </p>
          )}
        </div>

        {reviewMutation.isError && (
          <p
            role="alert"
            className="text-sm font-semibold text-red-700 dark:text-red-300"
          >
            {reviewMutation.error.message}
          </p>
        )}

        <Button
          type="submit"
          isLoading={reviewMutation.isPending}
          loadingText="Reviewing project..."
          className="bg-[#FAAB18] font-bold text-[#3D0C02] hover:bg-[#e5990b]"
        >
          Review my project
        </Button>
      </form>

      {review && (
        <article className="space-y-5 rounded-2xl border border-[#3D0C02]/10 bg-white p-6 shadow-sm dark:border-[#FAAB18]/20 dark:bg-[#2B1517]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-black">Your review</h2>
            <span
              className={`rounded-full px-3 py-1 text-sm font-bold ${READINESS_STYLE[review.readiness]}`}
            >
              {READINESS_LABEL[review.readiness]}
            </span>
          </div>

          <p className="leading-relaxed">{review.summary}</p>

          <div>
            <h3 className="mb-2 font-bold">Strengths</h3>
            <ul className="list-disc space-y-1 pl-5">
              {review.strengths.map((strength, index) => (
                <li key={`${index}-${strength}`}>{strength}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 font-bold">Improvements</h3>
            <ul className="list-disc space-y-1 pl-5">
              {review.improvements.map((improvement, index) => (
                <li key={`${index}-${improvement}`}>{improvement}</li>
              ))}
            </ul>
          </div>
        </article>
      )}
    </section>
  );
}

export default ReviewPage;
