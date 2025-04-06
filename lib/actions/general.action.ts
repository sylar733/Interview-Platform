import { db } from '@/firebase/admin';

export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
  const snapshot = await db.collection('interviews').where('userId', '==', userId).get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params;

  try {
    const snapshot = await db.collection('interviews').where('finalized', '==', true).get(); // no orderBy, avoids needing index

    const interviews = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .filter((interview) => interview.userId !== userId) // filter out your own
      .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds) // manual sorting
      .slice(0, limit); // apply limit after sorting

    return interviews;
  } catch (error) {
    console.error('Error in getLatestInterviews:', error);
    return null;
  }
}
